import csv
import json
import os
import requests
from bs4 import BeautifulSoup
import pandas as pd
from urllib.parse import urljoin, urlparse, urlunparse

INPUT_CSV = "dpheUpazilaUrls.csv"
OUTPUT_DIR = "output"
CONTACTS_DIR = os.path.join(OUTPUT_DIR, "contacts")
ERRORS_DIR = os.path.join(OUTPUT_DIR, "errors")
MERGED_CONTACTS_CSV = os.path.join(OUTPUT_DIR, "dpheUpazilaContacts.csv")

os.makedirs(CONTACTS_DIR, exist_ok=True)
os.makedirs(ERRORS_DIR, exist_ok=True)

def force_http(url):
    parts = list(urlparse(url))
    parts[0] = "http"
    return urlunparse(parts)

def extract_staff_contacts(base_url, region_key, failed_urls):
    contacts = []
    try:
        url = urljoin(force_http(base_url) + '/', "site/view/StaffList")
        print(url)
        response = requests.get(url, timeout=10, verify=False)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")
        rows = soup.select("table tbody tr")

        for row in rows:
            cols = row.find_all("td")
            if len(cols) >= 5:
                name_tag = cols[1].find("a")
                email_tag = cols[3].find("a")
                phone_tag = cols[4].find("a")

                name = name_tag.text.strip() if name_tag else ""
                role = cols[2].text.strip()
                email = (
                    email_tag.text.strip()
                    if email_tag and email_tag.get("href", "").startswith("mailto:")
                    else ""
                )
                phone_number = phone_tag.text.strip() if phone_tag else ""

                if name and role:
                    contacts.append({
                        "RegionKey": region_key,
                        "Name": name,
                        "Role": role,
                        "Email": email,
                        "PhoneNumber": phone_number,
                        "Type": "staff"
                    })
    except Exception as e:
        print(f"  ❌ Error fetching data for {region_key} (staff): {e}")
        failed_urls.append({
            "RegionKey": region_key,
            "Url": url,
            "Type": "staff",
            "Error": str(e)
        })
    return contacts

def extract_officer_contacts(base_url, region_key, failed_urls):
    contacts = []
    try:
        url = urljoin(force_http(base_url) + '/', "site/view/officer_list")
        print(url)
        response = requests.get(url, timeout=10, verify=False)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")
        rows = soup.select("table tbody tr")

        for row in rows:
            cols = row.find_all("td")
            if len(cols) >= 7:
                name_tag = cols[1].find("a")
                email_tag = cols[4].find("a")
                phone_tag = cols[5].find("a")

                name = name_tag.text.strip() if name_tag else ""
                role = cols[2].text.strip()
                email = (
                    email_tag.text.strip()
                    if email_tag and email_tag.get("href", "").startswith("mailto:")
                    else ""
                )
                phone_number = phone_tag.text.strip() if phone_tag else ""

                if name and role:
                    contacts.append({
                        "RegionKey": region_key,
                        "Name": name,
                        "Role": role,
                        "Email": email,
                        "PhoneNumber": phone_number,
                        "Type": "officer"
                    })
    except Exception as e:
        print(f"  ❌ Error fetching data for {region_key} (officer): {e}")
        failed_urls.append({
            "RegionKey": region_key,
            "Url": url,
            "Type": "officer",
            "Error": str(e)
        })
    return contacts

# Main logic
with open(INPUT_CSV, newline="", encoding="utf-8") as f:
    reader = list(csv.DictReader(f))
    total = len(reader)

    for idx, row in enumerate(reader, start=1):
        region_key = row["RegionKey"]
        base_url = row["RegionDpheUrl"]

        contact_file = os.path.join(CONTACTS_DIR, f"{region_key}.csv")
        if os.path.exists(contact_file):
            print(f"➡️  Skipping {region_key}: contacts file already exists.")
            continue

        print("-" * 32)
        print(f"{idx} / {total} Processing: {region_key}")

        failed_urls = []
        contacts_staff = extract_staff_contacts(base_url, region_key, failed_urls)
        contacts_officer = extract_officer_contacts(base_url, region_key, failed_urls)
        all_contacts = contacts_staff + contacts_officer

        if all_contacts:
            pd.DataFrame(all_contacts).to_csv(contact_file, index=False, encoding="utf-8")
            print(f"✅ Saved contacts to {contact_file}")
        
        if failed_urls:
            error_file = os.path.join(ERRORS_DIR, f"{region_key}.csv")
            pd.DataFrame(failed_urls).to_csv(error_file, index=False, encoding="utf-8")
            print(f"⚠️  Saved errors to {error_file}")

# Merge all contact CSVs into one
merged_contacts = []
for file in os.listdir(CONTACTS_DIR):
    if file.endswith(".csv"):
        df = pd.read_csv(os.path.join(CONTACTS_DIR, file))
        merged_contacts.append(df)

if merged_contacts:
    df_merged = pd.concat(merged_contacts, ignore_index=True)
    df_merged.to_csv(MERGED_CONTACTS_CSV, index=False, encoding="utf-8")
    print(f"\n✅ Merged {len(df_merged)} contacts into {MERGED_CONTACTS_CSV}")
else:
    print("❗ No contact files found to merge.")
