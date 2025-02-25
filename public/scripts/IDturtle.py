import pyautogui
import time
import os

# プログラムを実行
os.startfile(r'C:\Program Files (x86)\Sky Product\SKYMENU\bin\FsViewer.exe')
time.sleep(4)  # プログラムが起動するまで待機
add_button_location = pyautogui.locateCenterOnScreen(r'C:\Users\student.JYOUHOU\Desktop\add.png', confidence=0.6)
if add_button_location:
    print(f"Clicking add button at {add_button_location}.")  # クリック位置を表示
    pyautogui.click(add_button_location)  # addボタンをクリック




def clear_and_write(value):
    """フィールドをクリアして値を書き込む関数"""
    pyautogui.hotkey('ctrl', 'a')
    pyautogui.press('backspace')
    pyautogui.write(value)

success = [2004]
currentTry = 0

# successID.txtに成功したIDを保存する関数
def save_success_ids(success_list):
    with open('successIDa.txt', 'w') as file:
        for id in success_list:
            file.write(f"{id}\n")



def newTry():
    closeButton = pyautogui.locateCenterOnScreen(r'C:\Users\student.JYOUHOU\Desktop\close.png', confidence=0.6)
    if closeButton:
        pyautogui.click(closeButton)
    
    print("Waiting for 12 seconds before restarting the program...")  # Indicate waiting
    for i in range(12):
        print(f"Waiting... {12 - i} seconds remaining")  # Text-based animation
        time.sleep(1)
    
    os.startfile(r'C:\Program Files (x86)\Sky Product\SKYMENU\bin\FsViewer.exe')
    
    print("Waiting for 6 seconds for the program to start...")  # Indicate waiting
    for i in range(6):
        print(f"Waiting... {6 - i} seconds remaining")  # Text-based animation
        time.sleep(1)
    print(" " * 30, end='\r')  # Clear the line after waiting
   
    
for i in range(3000, 4000):
    if i in success:
        continue  # If i includes success, pass
    
    # 数値を含むタブを選択して入力
    tryValue = f"z2{i}"
    print("try", str(tryValue))
    #print(success)
    clear_and_write(tryValue)  # 初回入力
    pyautogui.press('tab')  # タブキーを押して次の欄に移動
    
    clear_and_write(tryValue)  # 再度入力
    pyautogui.press('enter')
    
    time.sleep(0.5)  # ポップアップウィンドウが表示されるまで待機
    #pyautogui.screenshot('current_screen.png')  # 現在の画面をキャプチャ
    # ここでポップアップの確認を自動化
    t = False
    try:
        t = pyautogui.locateOnScreen(r'C:\Users\student.JYOUHOU\Desktop\popup_image.png', confidence=0.6)
    except Exception as error:
        print(error)

    if t:  # 'popup_image.png'はポップアップの画像
        pyautogui.press('enter')
        #success.append(i)  # 成功した場合、iをsuccessに追加
        #save_success_ids(success)  # successをファイルに保存
    else:
        currentTry += 1
        if currentTry > 8:
            newTry()
            currentTry = 0
        print(f"Popup not displayed for i={i}. Clicking add button.")
        # add.pngをクリック
        add_button_location = pyautogui.locateCenterOnScreen(r'C:\Users\student.JYOUHOU\Desktop\add.png', confidence=0.6)
        if add_button_location:
            print(f"Clicking add button at {add_button_location}.")  # クリック位置を表示
            pyautogui.click(add_button_location)  # addボタンをクリック
            success.append(i)  # iをsuccessに追加
            print(success)
            save_success_ids(success)  # successをファイルに保存
        else:
            print(f"Add button not found for i={i}. Ignoring error.")
    
    for _ in range(4):  # 4回タブキーを押す
        pyautogui.press('tab')
