import threading
from src.bot.main import TradeDirect
from src.helper.helper import get_fields,get_the_instance
from dotenv import load_dotenv
import os
import datetime

load_dotenv()
status_url  = os.getenv("ORDER_STATUS_URL")
trade_url  = os.getenv("TRADE_STATUS_URL")


def place_order(instances:list , data:dict) -> None:
    # print(data)
    if type(data.get("order")) is list :
        # print(data.get("order"))
        for order in data.get("order"):
            print("Number of Trades:", len(data.get("order")))
            
            
            result=get_fields(order)
            # print("Order:>><<<",order)
            tradeId = order.get("tradeId")
            op = order.get("openPrice")
            exit_type = order.get("exit")
            # print(result[-3])
            bot = get_the_instance(instances,"email",result[-3])
            # print(result[0])
            if result[0]:
                print("Order to Trade")
                p = threading.Thread(target = bot.order, args=(
                                                            result[1],result[2],result[3],
                                                            result[4],result[5],result[6],
                                                            result[7],result[8],result[9],
                                                            result[10],result[11],result[12],
                                                            result[13],result[14],status_url,
                                                            result[18]
                                                        ))
                
                p.start()
            
            if exit_type == "Partial Exit":
                print("order",order)
                print("Partial Exit")
                reformattedData = order.get("reformattedData")
                account_id = order.get("account", {}).get("id")
                TradeId = order.get("tradeId")
                print(TradeId)
                p = threading.Thread(target = bot.cancel, args=(
                                                                result[2],result[1],
                                                                exit_type,result[4],
                                                                status_url,result[18],
                                                                result[19],op,TradeId,reformattedData,account_id
                                                                    ))
                p.start()

            elif result[16]:
                print("Ammending order")
                TradeId = order.get("tradeId")
                idsArray = order.get("idsArray")
                if idsArray is None:
                    idsArray = None
                print(order)
                reformattedData = order.get("reformattedData")
                account_id = order.get("account", {}).get("id")
                # print(idsArray)
                p = threading.Thread(target = bot.ammend, args=(
                                                        result[1],result[9],
                                                        result[10],result[2],
                                                        status_url,
                                                        result[18],result[19],op,TradeId,idsArray,account_id,reformattedData
                                                        ))
                print(tradeId)
                p.start()

            elif exit_type == "Exit":
                print("Exiting")
                TradeId = order.get("tradeId")
                reformattedData = order.get("reformattedData")
                if reformattedData is None:
                    reformattedData = None
                account_id = order.get("account", {}).get("id")
                if account_id is None:
                    account_id = None
                p = threading.Thread(target = bot.cancel, args=(
                                                        result[2],result[1],
                                                        exit_type,result[4],
                                                        status_url,result[18],
                                                        result[19],op,TradeId,account_id,reformattedData
                                                        ))
            
                p.start()
                

def place_Trade(instances:list , data:dict) -> None:
    # print(data)

    if type(data.get("order")) is list :
        for order in data.get("order"):
            print("orders",order)
            print("Number of orders:", len(data.get("order")))
            # if 'amount' not in order:
            #     # print("Error: 'amount' key is missing in the order data.")
            #     continue
            # print("Trade:>><<<",order)
            result=get_fields(order)
            op = order.get("openPrice")
            tradeId = order.get("tradeId")
            toOrder = order.get("toOrder")
            exit_type = order.get("exit")
            status_type = order.get("status")
            myammount = order.get("amount")
            # print(order)
            bot = get_the_instance(instances,"email",result[-3])
            # print(result[0])
            # print(bot)
            
            
            if toOrder:
                print("Order to Trade")
                p = threading.Thread(target = bot.tradetoOrder, args=(
                                                            result[1],myammount,result[2],result[3],
                                                            result[4],result[5],result[6],
                                                            result[7],result[8],result[9],
                                                            result[10],result[11],result[12],
                                                            result[13],result[14],trade_url,
                                                            result[18]
                                                        ))
                
                p.start()
            
            elif result[0]:
                print("Placing New Order")
                p = threading.Thread(target = bot.trade, args=(
                                                            result[1],myammount,result[2],result[3],
                                                            result[4],result[5],result[6],
                                                            result[7],result[8],result[9],
                                                            result[10],result[11],result[12],
                                                            result[13],result[14],trade_url,
                                                            result[18]
                                                        ))
                
                p.start()
            
            elif exit_type == "Partial Exit":
                print("Partial Exit")
                p = threading.Thread(target = bot.cancel, args=(
                                                                result[2],result[1],
                                                                exit_type,result[4],
                                                                trade_url,result[18],
                                                                result[19],op
                                                                    ))
                p.start()

            elif result[16]:
                print("Ammending trade")
                created_at = order.get("createdAt")
                orderIdArray = order.get("orderId")
                if orderIdArray is None:
                    orderIdArray = None
                TradeId = order.get("tradeId")
                reformattedData = order.get("reformattedData")
                account_id = order.get("account", {}).get("id")
                orderId = order.get("tradeIdArray")
                if orderId is None:
                    orderId = None
                created_at_datetime = datetime.datetime.strptime(created_at, "%Y-%m-%dT%H:%M:%S.%fZ")
                formatted_created_at = created_at_datetime.strftime("%d/%m/%y %H:%M:%S")
                p = threading.Thread(target = bot.tradeammend, args=(
                                                        result[1],result[9],
                                                        result[10],result[2],
                                                        trade_url,
                                                        result[18],formatted_created_at,result[19],op,TradeId,orderId,orderIdArray,account_id,reformattedData
                                                        ))
                p.start()

            elif exit_type == "MultipleExit":
                            # print("Trade:>><<<",order)
                            print("MultipleExit")
                            TradeId = order.get("tradeId")
                            idsArray = order.get("idsArray")
                            reformattedData = order.get("reformattedData")
                            account_id = order.get("account", {}).get("id")
                            if idsArray is None:
                                idsArray = None
                            if account_id is None:
                                account_id = None
                            if reformattedData is None:
                                reformattedData = None
                            side = order.get("side")
                            p = threading.Thread(target = bot.ordercancel, args=(
                                                                    result[2],result[1],
                                                                    exit_type,result[4],
                                                                    status_url,result[18],
                                                                    result[19],op,TradeId,side,idsArray,reformattedData,account_id,
                                                                    trade_url  
                                                                    ))
                        
                            p.start()
                                
            elif exit_type == "Exit":
                # print("Trade:>><<<",order)
                print("Exiting")
                idsArray = order.get("idsArray")
                if idsArray is None:
                    idsArray = None
                # print(idsArray)
                reformattedData = order.get("reformattedData")
                account_id = order.get("account", {}).get("id")
                if idsArray is None:
                    idsArray = None
                if account_id is None:
                    account_id = None
                if reformattedData is None:
                    reformattedData = None
                TradeId = order.get("tradeId")
                side = order.get("side")
                # print(side)
                print("working")
                p = threading.Thread(target = bot.ordercancel, args=(
                                                        result[2],result[1],
                                                                    exit_type,result[4],
                                                                    status_url,result[18],
                                                                    result[19],op,TradeId,side,idsArray,reformattedData,account_id,
                                                                    trade_url  
                                                        ))
            
                p.start()
       

def set_accounts(instances:list,data:dict) -> None:
    # print(data)
    if type(data) is not list:
        objs =  data.get("accounts")
        acc_type =  data.get("type")
    if acc_type == "New Account":
        for instance in instances:
            bot = instance.get("inst")
            print("Closing old threads.")
            bot.close()

    instances.clear()
    data = objs

    for acc_obj in data:
        email = acc_obj.get("email")
        password = acc_obj.get("password")
        account_id = acc_obj.get("accountId")
        id = acc_obj.get("id")
        print(id,email)
        print("Thread starting . . . ")
        bot = TradeDirect()
        process = threading.Thread(target=bot.launch_account, args=(account_id,email,password,))
        process.start()

        inst_obj = {
                    "id":id,
                    "inst":bot,
                    "email":email
                    }
        
        instances.append(inst_obj)
