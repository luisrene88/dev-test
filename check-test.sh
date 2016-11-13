#!/bin/bash


#bin/bash

echo "Processing $pathname $fixed_pathname"
echo '{
    "comments": [
        {
            "line": 1,
            "id": "some-unique-id-for-the-comment",
            "message": "A human readable text which is later displayed, and which may have a {placeholder}",
            "params": {
                "placeholder": "some-value"
            }
        },
    ],

    "fixed_content": "New Content of the file if it should be changed, or omitted if it should not be changed."
}'
