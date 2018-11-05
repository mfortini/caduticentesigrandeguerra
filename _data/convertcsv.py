import pandas as pd

dd=pd.read_csv("Martiri e caduti - 1915-1918.csv")
dd["title"]=dd["Numero"].astype(str)+"_"+dd["Cognome"]+"_"+dd["Nome"]
dd.to_json("caduti.json",orient="records")
