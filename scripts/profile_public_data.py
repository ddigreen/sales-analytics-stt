#!/usr/bin/env python3
"""Reproduce descriptive UCI Bank Marketing profiling; standard library only."""
import argparse, collections, csv, hashlib, io, json, urllib.request, zipfile
from datetime import datetime, timezone
from pathlib import Path

def profile(archive):
    with zipfile.ZipFile(io.BytesIO(archive)) as outer:
        with zipfile.ZipFile(io.BytesIO(outer.read('bank-additional.zip'))) as inner:
            raw=inner.read('bank-additional/bank-additional-full.csv')
    rows=list(csv.DictReader(io.StringIO(raw.decode('utf-8')),delimiter=';'))
    if not rows or len(rows[0])!=21 or 'y' not in rows[0]:
        raise ValueError('Unexpected dataset schema')
    y=collections.Counter(r['y'] for r in rows)
    unknown={c:sum(r[c]=='unknown' for r in rows) for c in rows[0] if any(r[c]=='unknown' for r in rows)}
    return {'dataset':'UCI Bank Marketing','source_url':'https://archive.ics.uci.edu/dataset/222/bank+marketing','download_url':'https://archive.ics.uci.edu/static/public/222/bank+marketing.zip','variant':'bank-additional-full.csv','run_timestamp_utc':datetime.now(timezone.utc).isoformat(),'rows':len(rows),'columns':len(rows[0]),'inputs':len(rows[0])-1,'target_counts':dict(y),'positive_rate':y['yes']/len(rows),'majority_class_accuracy':max(y.values())/len(rows),'unknown_counts':unknown,'sha256_archive':hashlib.sha256(archive).hexdigest(),'sha256_csv':hashlib.sha256(raw).hexdigest(),'has_audio':False,'has_transcripts':False,'has_joinable_call_id':False,'scope':'Descriptive analysis only; no predictive model or STT evaluation performed'}

def main():
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('--archive',type=Path,help='Local official UCI archive for offline reproduction')
    p.add_argument('--output',type=Path,default=Path('research/public_data_profile.json'))
    a=p.parse_args()
    if a.archive:
        raw=a.archive.read_bytes()
    else:
        with urllib.request.urlopen('https://archive.ics.uci.edu/static/public/222/bank+marketing.zip',timeout=60) as r:
            raw=r.read()
    result=profile(raw)
    a.output.parent.mkdir(parents=True,exist_ok=True)
    a.output.write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps(result,indent=2))

if __name__=='__main__':
    main()
