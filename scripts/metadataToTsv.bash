#!/bin/bash
#
# Script to export all skin metadata JSON files to TSV. Originally used to populate HKSkins Google Sheet.
# Google Sheet: https://docs.google.com/spreadsheets/d/13mTeBVJfa-3oZOI-p65P9IjP9u6Ik4EjicYVK3B-SN8/edit
# Script v1.0.0, 2025-07-05
#

# Get project root path
SCRIPT=$(realpath "$0")
SCRIPT_PATH=$(dirname "$SCRIPT")
ROOT_PATH=$(dirname "$SCRIPT_PATH")

OUTPUT_FILE=$ROOT_PATH/scripts/output.tsv

for d in $ROOT_PATH/static/skins/*/
do
	(cd "$d" && jq -r '[.name, .author, .desc, .source, .dateAdded, .game, .type, .dateAdded] | @tsv' metadata.json >> $OUTPUT_FILE )
done
