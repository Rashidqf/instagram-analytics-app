
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.keys import Keys
from time import sleep
from src.bot import xpaths
import requests
import threading

def multiple_cancle(driver,*args):
    
    process = threading.Thread(target=cancel_order, args=(driver,*args))
    process.start()
    process.join()




def cancel_order(driver,action_type:str,
                sel_market_name:str,
                selling_type:str,
                amount:int,
                status_url:str,
                id:str,order_created,
                open_price:str,
                tradeId: str
                ):
        global direction_value 
        direction_value = tradeId
        """ This function allow to exit or partial exit from the existing order.

        Args:
            sel_market_name(str): name of the marketplace.
            action_type(str): order type(Trade/Order)
            amount(int):  amount of the order.
            selling_type(str):  order exit type(Entire/Partial).
            id(str): order id

        Returns:
            The return value. True and send the status for Closed, Desyncronised and return False otherwise.

        """
        print({"closing market_name":sel_market_name,"id":id,"creation time": order_created})
        cancel_xpaths = xpaths.cancel_order
        # driver.refresh()
        driver.find_element(By.TAG_NAME,"body").send_keys(Keys.CONTROL + Keys.END)
        sleep(.2)
        # if action_type == "trade":
        #     if order_created is not None:
        try:
            WebDriverWait(driver, 2).until(
                EC.element_to_be_clickable((By.XPATH, cancel_xpaths["cancel_button"].format(order_created)))).click()
        except:
            try:
                print("Not already expanded")

                WebDriverWait(driver, 2).until(
                    EC.element_to_be_clickable((By.XPATH, xpaths.common["expand_market"].format(sel_market_name)))).click()
                print("Expanded")
                sleep(.2)
                WebDriverWait(driver, 3).until(
                    EC.element_to_be_clickable((By.XPATH, cancel_xpaths["trade_cencel"].format(tradeId)))).click()
            except:
                # WebDriverWait(driver, 2).until(
                #     EC.element_to_be_clickable((By.XPATH, cancel_xpaths["cancel_button"].format(order_created)))).click()
                print("Something went wrong")

            else:
                try:
                    new_el = driver.find_element(By.XPATH, cancel_xpaths["exit_path"].format(sel_market_name))
                    new_el.click()
                except:
                    #print("Unable to find the element")
                    requests.post(status_url,verify=False,data={"id":id,"status":"Desyncronised", "orderCreated": order_created,"message":"Ordrer Desyncronised", "tradeId": direction_value})
                    return False
            
            if selling_type != "Exit":
                try:
                    sleep(.2)
                    amount_elem = WebDriverWait(driver, 2).until(EC.element_to_be_clickable((By.XPATH,cancel_xpaths["amount_input"])))
                    amount_elem.clear()
                    amount_elem.send_keys(amount)
                except:
                    requests.post(status_url,verify=False,data={"id":id,"status":"Desyncronised", "orderCreated": order_created,"message":"Ordrer Desyncronised", "tradeId": direction_value})
                    return False

            #selling submission
            try:
                WebDriverWait(driver, 2).until(EC.element_to_be_clickable((By.XPATH, xpaths.common["submit_button"]))).click()
                WebDriverWait(driver, 2).until(EC.element_to_be_clickable((By.XPATH,cancel_xpaths["print_button"])))
                print("Success!")
                
            except:
                #print("Error at submission")
                requests.post(status_url,verify=False,data={"id":id,"status":"Desyncronised", "orderCreated": order_created,"message":"Ordrer Desyncronised", "tradeId": direction_value})
                return False
            

            try:
                driver.find_element(By.XPATH,xpaths.common["close_button"]).click()

            except: 
                print("Close btn not found")
                pass

            if selling_type != "Exit":
                requests.post(status_url,verify=False,data={"id":id,  "status":"Active","orderCreated": order_created,"openPrice":open_price,"message":"Paritial Exit", "tradeId": direction_value})
            else:
                requests.post(status_url,verify=False,data={"id":id,"status":"Closed","message":"Order Closed", "tradeId": direction_value})
    
        else:
            try:
                sleep(.5)
                WebDriverWait(driver, 2).until(EC.element_to_be_clickable((By.XPATH, xpaths.common["opened_order"]))).click()
                WebDriverWait(driver, 2).until(EC.element_to_be_clickable((By.XPATH,cancel_xpaths["last_remove"].format(order_created)))).click()
                WebDriverWait(driver, 2).until(EC.element_to_be_clickable((By.XPATH,cancel_xpaths["confirm"]))).click()
                driver.find_element(By.XPATH,xpaths.common["close_button"]).click()
                sleep(.5)
                print("Order Exit")
            except: 
                #print("Something wrong")
                return False
            
            requests.post(status_url,verify=False,data={"id":id,"status":"Closed","message":"Order Closed", "tradeId": direction_value})