import pandas as pd
import numpy as np
import heapq

def find_top_n_errors(file_path, N):
    try:
        # קריאת קובץ האקסל
        df = pd.read_excel(file_path)
    except FileNotFoundError:
        print(f"שגיאה: הקובץ '{file_path}' לא נמצא.")
        return []

    # קבלת מספר השורות הכולל ב-DataFrame
    num_rows = len(df)

    # הגדרת מספר החלקים הרצוי (ניתן לשנות לפי הצורך)
    num_parts = 100

    # שימוש ב-np.array_split כדי לפצל את האינדקס של ה-DataFrame לחלקים
    row_indices = np.array_split(df.index, num_parts)

    # יצירת רשימה של DataFrames, כאשר כל אחד מכיל חלק מהשורות
    data_chunks = [df.loc[indices].copy() for indices in row_indices]

    array_of_dicts = [{} for _ in range(num_parts)]

    for i, chunk in enumerate(data_chunks):

        # חילוץ פרטי השגיאה (בהנחה שהשגיאה נמצאת בעמודה הראשונה)
        if not chunk.empty:
            text_column = chunk.iloc[:, 0].astype(str) # המרה ל-str כדי למנוע שגיאות
            extracted_values = text_column.str.extract(r'Error: ([\w\d_]+)')
            # המרת העמודה לרשימה נקייה
            extracted_list = extracted_values[0].dropna().tolist()
            # עיבוד כל ערך בנפרד
            for error in extracted_list:
                if error not in array_of_dicts[i]:
                    array_of_dicts[i][error] = 1
                else:
                    array_of_dicts[i][error] += 1

    all_errors = {}

    #חיבור כל השגיאות מכל החלקים
    for d in array_of_dicts:
        for key, value in d.items():
            all_errors[key] = all_errors.get(key, 0) + value

    top_n_errors = heapq.nlargest(N, all_errors.items(), key=lambda x: x[1])
    return top_n_errors

# שימוש בפונקציה
file_path = 'logs.txt.xlsx'
n_top = 5
top_errors = find_top_n_errors(file_path, n_top)
print(f"\n{n_top} השגיאות הנפוצות ביותר:")
print(top_errors)