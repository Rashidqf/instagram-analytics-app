from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from time import sleep
import requests
from src.bot import xpaths


def ammend_order(
        driver,market_name:str,
        ammend_point_away:int,
        ammend_at_price:int,
        action_type:str,status_url:str,
        id:str,order_created,open_price:str,TradeId:str,idsArray:str,account_id:str,reformattedData: dict) -> bool:
        print(TradeId)
        print("reformattedData",reformattedData)
        """ This function allow to ammend  from the existing order.

        Args:
            market_name(str): name of the marketplace.
            ammend_point_away(str): stop points away for the order
            ammend_at_price(str):  stop at price for the order.
            id(str): order id

        Returns:
            The return value. True and send the status for Active, Desyncronised and return False otherwise.

        """
        ammend_xpaths = xpaths.ammend
        
        # driver.refresh()
        driver.find_element(By.TAG_NAME,"body").send_keys(Keys.CONTROL + Keys.END)
        
        matching_data = None
        ids = None
        
        if reformattedData is not None and account_id in reformattedData.keys():
            account_data = reformattedData[account_id]
            ids = account_data['ids']
            trade_ids = account_data['tradeIds']
    
            successful_iteration = False
            if ids is not None:
                for i in range(len(ids)):
                    print("if")
                    try:
                        current_id = ids[i]
                        current_trade_id = trade_ids[i]
                        print("ID:", current_id)
                        print("Trade ID:", current_trade_id)

                        # Click on cancel button
                        try:
                            WebDriverWait(driver, 1).until(
                                    EC.element_to_be_clickable((By.XPATH, ammend_xpaths["edit_button"].format(current_trade_id)))).click()
                            print("trade_ammed")
                            print(ammend_xpaths["edit_button"].format(current_trade_id))
                            sleep(.2)
                        except Exception as e:
                            try:
                                WebDriverWait(driver, 2).until(
                                    EC.element_to_be_clickable((By.XPATH, xpaths.common["expand_market"].format(market_name)))).click()
                                print("Expanded")
                                print(current_trade_id)
                                sleep(.2)

                                WebDriverWait(driver, 1).until(
                                    EC.element_to_be_clickable((By.XPATH, ammend_xpaths["edit_button"].format(current_trade_id)))).click()
                                print("edit_button")
                                sleep(.2)
                            except:
                                print("Something went wrong")
                                requests.post(status_url,verify=False,data={"id":current_id,"status":"Desyncronised", "orderCreated": order_created,"message":"Ordrer Desyncronised","tradeId" : current_trade_id})
                                # return False
                    except Exception as e:
                        requests.post(status_url,verify=False,data={"id":current_id,"status":"Desyncronised", "orderCreated": order_created,"message":"Ordrer Desyncronised","tradeId" : current_trade_id})
                    try:
                        try:
                            WebDriverWait(driver, 4).until(
                                    EC.element_to_be_clickable((By.XPATH,ammend_xpaths["stop_price_input_selected"])))
                            print("stop_price_input_selected")
                            already_selected = True
                        except: 
                            driver.find_element(By.CSS_SELECTOR, ammend_xpaths["stop_checkbox"]).click()
                            already_selected = False
                            print("stop_checkbox")

                        print(ammend_at_price)
                        if ammend_point_away:
                            if already_selected:
                                input_path = ammend_xpaths["points_away_input_selected"]
                            else:
                                input_path = ammend_xpaths["stop_point_input_selected"]
                            input_elem = WebDriverWait(driver, 3).until(EC.element_to_be_clickable((By.XPATH,input_path)))
                            input_elem.click()
                            sleep(.1)
                            if not already_selected:
                                input_elem.send_keys(ammend_point_away)
                            else:
                                send_amount_elem = WebDriverWait(driver, 3).until(
                                    EC.element_to_be_clickable((By.XPATH, ammend_xpaths["points_away_input"])))
                                send_amount_elem.clear()
                                send_amount_elem.send_keys(ammend_point_away)
                        
                        elif ammend_at_price:
                            
                            print("at price")
                            if not already_selected:
                                at_price_path = ammend_xpaths["stop_price_input_not_selected"]
                            else:
                                at_price_path = ammend_xpaths["ammend_at_price_input"]

                            ammend_elem = driver.find_element(By.XPATH,at_price_path)
                            ammend_elem.send_keys(Keys.ENTER)
                            ammend_elem.clear()
                            ammend_elem.send_keys(ammend_at_price)
                            print("at price")
                    except Exception as e:
                        requests.post(status_url,verify=False,data={"id":current_id,"status":"Desyncronised", "orderCreated": order_created,"message":"Ordrer Desyncronised","tradeId" : current_trade_id})
                        print("orderCreated")
                    try:
                        driver.find_element(By.XPATH, xpaths.common["submit_button"]).click()
                        sleep(.2)
                        
                        print("success")
                        requests.post(status_url,verify=False,data={"id":current_id,"status":"Active","orderCreated": order_created,"openPrice":open_price,"message":"Ordrer Ammend","tradeId" : current_trade_id})
                        
                        # WebDriverWait(driver, 2).until(EC.element_to_be_clickable((By.XPATH, xpaths.common["back_button"])))
                        
                    except Exception as e:
                        print("Something went wrong !!")
                        # try:
                        #     sleep(.2)
                        #     driver.find_element(By.XPATH, xpaths.common["close_button"]).click()
                        #     sleep(.15)
                        # except: 
                        #     pass
                        #     #print("Close btn not found")
                        requests.post(status_url,verify=False,data={"id":current_id,"status":"Desyncronised", "orderCreated": order_created,"message":"Ordrer Desyncronised","tradeId" : current_trade_id})
                        return False
            
                    
        else:
            print("else")
            try:
                WebDriverWait(driver, 1).until(
                        EC.element_to_be_clickable((By.XPATH, ammend_xpaths["edit_button"].format(TradeId)))).click()
                print("trade_ammed")
                print(ammend_xpaths["edit_button"].format(TradeId))

                sleep(.2)
            except Exception as e:
                try:
                    WebDriverWait(driver, 2).until(
                        EC.element_to_be_clickable((By.XPATH, xpaths.common["expand_market"].format(market_name)))).click()
                    print("Expanded")
                    print(TradeId)
                    sleep(.2)

                    WebDriverWait(driver, 1).until(
                        EC.element_to_be_clickable((By.XPATH, ammend_xpaths["edit_button"].format(TradeId)))).click()
                    print("edit_button")
                    sleep(.2)
                except:
                    print("Something went wrong")
                    requests.post(status_url,verify=False,data={"id":id,"status":"Desyncronised", "orderCreated": order_created,"message":"Ordrer Desyncronised","tradeId" : TradeId})
                    # return False
            try:
                try:
                    WebDriverWait(driver, 4).until(
                            EC.element_to_be_clickable((By.XPATH,ammend_xpaths["stop_price_input_selected"])))
                    print("stop_price_input_selected")
                    already_selected = True
                except: 
                    driver.find_element(By.CSS_SELECTOR, ammend_xpaths["stop_checkbox"]).click()
                    already_selected = False
                    print("stop_checkbox")

                print(ammend_at_price)
                if ammend_point_away:
                    if already_selected:
                        input_path = ammend_xpaths["points_away_input_selected"]
                    else:
                        input_path = ammend_xpaths["stop_point_input_selected"]
                    input_elem = WebDriverWait(driver, 3).until(EC.element_to_be_clickable((By.XPATH,input_path)))
                    input_elem.click()
                    sleep(.1)
                    if not already_selected:
                        input_elem.send_keys(ammend_point_away)
                    else:
                        send_amount_elem = WebDriverWait(driver, 3).until(
                            EC.element_to_be_clickable((By.XPATH, ammend_xpaths["points_away_input"])))
                        send_amount_elem.clear()
                        send_amount_elem.send_keys(ammend_point_away)
                
                elif ammend_at_price:
                    
                    print("at price")
                    if not already_selected:
                        at_price_path = ammend_xpaths["stop_price_input_not_selected"]
                    else:
                        at_price_path = ammend_xpaths["ammend_at_price_input"]

                    ammend_elem = driver.find_element(By.XPATH,at_price_path)
                    ammend_elem.send_keys(Keys.ENTER)
                    ammend_elem.clear()
                    ammend_elem.send_keys(ammend_at_price)
                    print("at price")


            except Exception as e:
                requests.post(status_url,verify=False,data={"id":id,"status":"Desyncronised", "orderCreated": order_created,"message":"Ordrer Desyncronised","tradeId" : TradeId})
                print("orderCreated")
                
                # try:
                #     driver.find_element(By.XPATH, xpaths.common["close_button"]).click()
                #     sleep(.2)
                # except:
                #     pass
                # return False

            #selling submission
            try:
                driver.find_element(By.XPATH, xpaths.common["submit_button"]).click()
                sleep(.2)
                
                print("success")
                requests.post(status_url,verify=False,data={"id":id,"status":"Active","orderCreated": order_created,"openPrice":open_price,"message":"Ordrer Ammend","tradeId" : TradeId})
                
                # WebDriverWait(driver, 2).until(EC.element_to_be_clickable((By.XPATH, xpaths.common["back_button"])))
                driver.refresh()
            except Exception as e:
                print("Something went wrong !!")
                # try:
                #     sleep(.2)
                #     driver.find_element(By.XPATH, xpaths.common["close_button"]).click()
                #     sleep(.15)
                # except: 
                #     pass
                #     #print("Close btn not found")
                requests.post(status_url, verify=False, data={"id":id,"status":"Desyncronised", "orderCreated": order_created,"message":"Ordrer Desyncronised","tradeId" : TradeId})
                return False
            
                print("id not found")
        
            
            # if order_created is not None:
            #     if action_type == "order":
            #         try:
            #             WebDriverWait(driver, 2).until(
            #                 EC.element_to_be_clickable((By.XPATH, xpaths.common["opened_order"].format(market_name)))).click()
            #             WebDriverWait(driver, 2).until(
            #                 EC.element_to_be_clickable((By.XPATH, ammend_xpaths["ammend_order"].format(order_created)))).click()
            #             sleep(.2)
            #         except Exception as e:
            #             pass
            #     else:
            try:
                WebDriverWait(driver, 1).until(
                        EC.element_to_be_clickable((By.XPATH, ammend_xpaths["edit_button"].format(TradeId)))).click()
                print("trade_ammed")
                sleep(.2)
            except Exception as e:
                try:
                    WebDriverWait(driver, 2).until(
                        EC.element_to_be_clickable((By.XPATH, xpaths.common["expand_market"].format(market_name)))).click()
                    print("Expanded")
                    print(TradeId)
                    sleep(.2)

                    WebDriverWait(driver, 1).until(
                        EC.element_to_be_clickable((By.XPATH, ammend_xpaths["edit_button"].format(TradeId)))).click()
                    print("edit_button")
                    sleep(.2)
                except:
                    print("Something went wrong")
                    requests.post(status_url,verify=False,data={"id":id,"status":"Desyncronised", "orderCreated": order_created,"message":"Ordrer Desyncronised","tradeId" : TradeId})
                    # return False

            try:
                try:
                    WebDriverWait(driver, 4).until(
                            EC.element_to_be_clickable((By.XPATH,ammend_xpaths["stop_price_input_selected"])))
                    print("stop_price_input_selected")
                    already_selected = True
                except: 
                    driver.find_element(By.CSS_SELECTOR, ammend_xpaths["stop_checkbox"]).click()
                    already_selected = False
                    print("stop_checkbox")

                print(ammend_at_price)
                if ammend_point_away:
                    if already_selected:
                        input_path = ammend_xpaths["points_away_input_selected"]
                    else:
                        input_path = ammend_xpaths["stop_point_input_selected"]
                    input_elem = WebDriverWait(driver, 3).until(EC.element_to_be_clickable((By.XPATH,input_path)))
                    input_elem.click()
                    sleep(.1)
                    if not already_selected:
                        input_elem.send_keys(ammend_point_away)
                    else:
                        send_amount_elem = WebDriverWait(driver, 3).until(
                            EC.element_to_be_clickable((By.XPATH, ammend_xpaths["points_away_input"])))
                        send_amount_elem.clear()
                        send_amount_elem.send_keys(ammend_point_away)
                
                elif ammend_at_price:
                    
                    print("at price")
                    if not already_selected:
                        at_price_path = ammend_xpaths["stop_price_input_not_selected"]
                    else:
                        at_price_path = ammend_xpaths["ammend_at_price_input"]

                    ammend_elem = driver.find_element(By.XPATH,at_price_path)
                    ammend_elem.send_keys(Keys.ENTER)
                    ammend_elem.clear()
                    ammend_elem.send_keys(ammend_at_price)
                    print("at price")


            except Exception as e:
                requests.post(status_url,verify=False,data={"id":id,"status":"Desyncronised", "orderCreated": order_created,"message":"Ordrer Desyncronised","tradeId" : TradeId})
                print("orderCreated")
                
                # try:
                #     driver.find_element(By.XPATH, xpaths.common["close_button"]).click()
                #     sleep(.2)
                # except:
                #     pass
                # return False

            #selling submission
            try:
                driver.find_element(By.XPATH, xpaths.common["submit_button"]).click()
                sleep(.2)
                
                print("success")
                requests.post(status_url,verify=False,data={"id":id,"status":"Active","orderCreated": order_created,"openPrice":open_price,"message":"Ordrer Ammend","tradeId" : TradeId})
                
                # WebDriverWait(driver, 2).until(EC.element_to_be_clickable((By.XPATH, xpaths.common["back_button"])))
                driver.refresh()
            except Exception as e:
                print("Something went wrong !!")
                # try:
                #     sleep(.2)
                #     driver.find_element(By.XPATH, xpaths.common["close_button"]).click()
                #     sleep(.15)
                # except: 
                #     pass
                #     #print("Close btn not found")
                requests.post(status_url, verify=False, data={"id":id,"status":"Desyncronised", "orderCreated": order_created,"message":"Ordrer Desyncronised","tradeId" : TradeId})
                return False
            # try:
            #     driver.find_element(By.XPATH, xpaths.common["close_button"]).click()
            # except: 
            #     print("Close btn not found")
            #     pass
            # # print("Success")