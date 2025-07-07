import json
import os
import pandas as pd

def generate_dropdown_data(mouzas):
    region_labels = {
        'divisions': [],
        'districts': [],
        'upazilas': [],
        'unions': [],
        'mouzas': [],
    }

    divisions = []
    rows = []  # To store full paths for CSV output

    for div in sorted(mouzas['div'].unique()):
        region_labels['divisions'].append(div)
        div_mouzas = mouzas[mouzas['div'] == div]
        districts = []

        for dis in sorted(div_mouzas['dis'].unique()):
            region_labels['districts'].append(dis)
            dis_mouzas = div_mouzas[div_mouzas['dis'] == dis]
            upazilas = []

            for upa in sorted(dis_mouzas['upa'].unique()):
                region_labels['upazilas'].append(upa)
                upa_mouzas = dis_mouzas[dis_mouzas['upa'] == upa]
                unions = []

                for uni in sorted(upa_mouzas['uni'].unique()):
                    region_labels['unions'].append(uni)
                    uni_mouzas = upa_mouzas[upa_mouzas['uni'] == uni]
                    mouzas_list = sorted(uni_mouzas['mou'].unique().tolist())
                    region_labels['mouzas'].extend(mouzas_list)

                    for mou in mouzas_list:
                        rows.append({
                            'division': div,
                            'district': dis,
                            'upazila': upa,
                            'union': uni,
                            'mouza': mou,
                        })

                    unions.append({
                        "union": uni,
                        "mouzas": mouzas_list
                    })

                upazilas.append({
                    "upazila": upa,
                    "unions": unions
                })

            districts.append({
                "district": dis,
                "upazilas": upazilas
            })

        divisions.append({
            "division": div,
            "districts": districts
        })

    os.makedirs('output', exist_ok=True)

    # Write hierarchical structure to JSON
    with open('output/dropdown-data.json', 'w') as f:
        json.dump(divisions, f, indent=2)

    # Write region label values to separate CSVs
    for region_type, values in region_labels.items():
        unique_values = sorted(set(values))
        df = pd.DataFrame(unique_values, columns=[region_type[:-1]])
        df.to_csv(f'output/{region_type}.csv', index=False)

    # Write full hierarchical paths to a CSV
    full_df = pd.DataFrame(rows)
    full_df.to_csv('output/dropdown-data.csv', index=False)

    return divisions
