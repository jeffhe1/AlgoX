import requests
import os
import pandas as pd

def main() :
    
    for name, value in os.environ.items():
        print(f"{name} : {value}")

    api_key = os.getenv('EODHD_API_KEY')
    print(api_key)
if __name__=="__main__" :
    main()