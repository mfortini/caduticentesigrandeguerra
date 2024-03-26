import pandas as pd

dd=pd.read_csv("Martiri e Caduti - 1915-1918.csv")
dd["title"]=dd["Numero"].astype(str)+"_"+dd["Cognome"]+"_"+dd["Nome"]
dd.to_json("caduti.json",orient="records")

cognomi=pd.DataFrame(dd["Cognome"].value_counts().copy())
cognomi.sort_values(by="Cognome",inplace=True)
cognomi=cognomi.reset_index()
cognomi.to_json("cognomi.json",orient="records")
