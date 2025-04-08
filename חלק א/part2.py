import pandas as pd
import numpy as np

def open(file):
    file = str(file)
    if file.endswith('.csv'):
        return pd.read_csv(file)
    elif file.endswith('.parquet'):
        return pd.read_parquet(file)
    else:
        return None


def save(file, name):
    name = str(name)
    if name.endswith('.csv'):
        file.to_csv(name, index=False)
    elif name.endswith('.parquet'):
        file.to_parquet(name)
    else:
        return None


# 1
def checking(file):
    #ביצוע בדיקות שאין כפולים, פורמט התאריך, והסרה כשאין נתונים או שהם לא נכונים כמו NaN
    file['timestamp'] = pd.to_datetime(file['timestamp'], errors='coerce')
    file = file.dropna(subset=['timestamp'], how='any')
    file = file.drop_duplicates(subset=['timestamp', 'value'])
    file.loc[:, 'value'] = pd.to_numeric(file['value'], errors='coerce')
    file = file.dropna(subset=['value'], how='any')
    return file

def calc_avg(file):
    #שמירת הנתונים בתוך מילון שהמפתח הוא התאריך והערך הוא מערך עם כמות וסכום
    dict_calc = {}
    for _, row in file.iterrows():
        hour_date = pd.to_datetime(row['timestamp']).strftime('%d/%m/%Y %H')
        if hour_date not in dict_calc:
            dict_calc[hour_date] = [row['value'], 1]
        else:
            dict_calc[hour_date][0] += row['value']
            dict_calc[hour_date][1] += 1

    send = {}
    #חישוב הממוצע
    for hour, data in dict_calc.items():
        send[hour] = data[0] / data[1]
    return send

df = pd.read_excel('time_series.xlsx')
cleaned_file=checking(df)
print(calc_avg(cleaned_file))

# 2
def calc_daily_avg_and_concat(file_path, num_parts=100):
    #חלוקה לקטעים קטנים יותר
    all_daily_averages = []
    df = open(file_path)
    df = checking(df)
    num_rows = len(df)
    row_indices = np.array_split(df.index, num_parts)
    data_chunks = [df.loc[indices].copy() for indices in row_indices]

    for chunk in data_chunks:
        chunk = chunk.set_index('timestamp')
        daily_avg = chunk['value'].resample('D').mean()
        daily_avg_df = pd.DataFrame({'date': daily_avg.index.date, 'average_value': daily_avg.values})
        all_daily_averages.append(daily_avg_df)

    final_daily_avg_df = pd.concat(all_daily_averages, ignore_index=True)
    save(final_daily_avg_df, "daily_average_aggregated.csv")


calc_daily_avg_and_concat('time_series.csv')

# 3
"""
אם הנתונים היו מגיעים בזרימה אז קודם כל צריך להשתמש בקריאה רציפה ולא קריאה מקובץ שלם
דבר שני אי אפשר לחלק מראש לקטעים אלא צריך לשמור מצב של הנתונים שהתקבלו עד כה ולבצע עליהם חישובים
כדי לבצע חישובים יומיים נצטרך לשמור לכל יום בנפרד מידע ונבצע את השמירה בסוף כל יום
כשמגיע יום חדש בזרימה נבצע את החישובים על היום שעבר ואז נאחד את הממוצעים
"""

# 4
"""
שימוש בקובץ parquet יותר יעיל בשימוש בנתונים בכמות גבוהה
וגם יותר מהיר לקרוא ממנו נתונים רק מעמודה מסויימת
ולכן הוא עדיף במקרה זה של הרבה נתונים ושליפה מעמודות מסויימות
"""