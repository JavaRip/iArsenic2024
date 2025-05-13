import { Storage } from '@google-cloud/storage';
import { Model6Data } from '../../types';
import { ModelMessageCode, Well } from 'iarsenic-types';

// Setup GCS client — assumes Application Default Credentials or service account key
const storage = new Storage();
const bucketName = 'iarsenic-model6';

async function fetchModelDataFromGCS(filename: string): Promise<Model6Data> {
    const file = storage.bucket(bucketName).file(`${filename}`);
    const [contents] = await file.download();
    return JSON.parse(contents.toString());
}

export default async function produceEstimate(completeWell: Well): Promise<ModelMessageCode> {
    const div = completeWell.division;
    const dis = completeWell.district;
    const upa = completeWell.upazila;
    const uni = completeWell.union;
    const mou = completeWell.mouza;

    if (!div || !dis || !upa || !uni || !mou) throw new Error(
        'Region not complete in well data'
    )

    const filename = `model/${div}-${dis}-${upa}-${uni}-${mou}.json`;
    const modelData: Model6Data = await fetchModelDataFromGCS(filename);

    const depth = completeWell.depth;
    if (!depth && depth !== 0) throw new Error(
        'depth not found in well data'
    );

    const staining = completeWell.staining
    if (!staining) throw new Error(
        'staining not found in well data'
    )

    const utensilStaining = completeWell.utensilStaining
    if (staining === 'not sure' && utensilStaining === undefined) {
        throw new Error('staining not sure and utensil staining unspecified')
    }

    const flooding = completeWell.flooding
    if (flooding === undefined) throw new Error(
        'flooding not found in well data'
    )

    console.log('---------------- PREDICTORS ----------------')
    console.log(completeWell)
    console.log('---------------- MODEL DATA ----------------')
    console.log(modelData)

    const regionStrataKey = (() => {
        if (depth < 15.3) return 's15';
        else if (depth < 45) return 's45';
        else if (depth < 65) return 's65';
        else if (depth < 90) return 's90';
        else if (depth < 150) return 's150';
        else return 'sD';
    })();

    /*
        if depth is < 15.3 attempt to use the flooding model
        if the flooding model is available, the key 'm2' will
        exist in the prediction data for this region
    */
    if (regionStrataKey === 's15' && 'm2' in modelData && modelData.s15) {
        if (staining === 'black' && modelData.s15.m2 !== undefined) {
            return modelData.s15.m2;
        } else if (flooding && modelData.s15.m9 !== undefined) {
            return modelData.s15.m9;
        } else if (modelData.s15.m7 !== undefined) {
            return modelData.s15.m7;
        } else {
            throw new Error('model keys required for flooding model misisng');
        }
    } else {
        if (staining === 'black' || utensilStaining === 'black') {
            return 1;
        } else if (staining === 'red' || utensilStaining === 'red') {
            if (modelData[regionStrataKey] && modelData[regionStrataKey].m !== undefined) {
                return modelData[regionStrataKey].m;
            } else {
                throw new Error('model key required for red staining missing');
            }
        } else {
            return 0;
        }
    }
}
