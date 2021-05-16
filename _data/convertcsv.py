import pandas as pd

dd=pd.read_csv("Martiri e Caduti - 1915-1918.csv")
dd["title"]=dd["Numero"].astype(str)+"_"+dd["Cognome"]+"_"+dd["Nome"]
dd.to_json("caduti.json",orient="records")

cognomi=dd["Cognome"].unique().copy()
cognomi.sort()
pd.DataFrame({"Cognome":cognomi}).to_json("cognomi.json",orient="records")
