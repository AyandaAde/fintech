import Dropdown from "@/components/Dropdown";
import RoundBtn from "@/components/RoundBtn";
import WidgetList from "@/components/SortableList/WidgetList";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useBalanceStore } from "@/store/balanceStore";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {useHeaderHeight} from "@react-navigation/elements";
export default function Home() {
  const { balance, runTransaction, transactions, clearTransactions } =
    useBalanceStore();
    const headerHeight = useHeaderHeight();

  function onAddMoney() {
    runTransaction({
      id: Math.random().toString(),
      amount: Math.floor(Math.random() * 1000) * (Math.random() > 0.5 ? 1 : -1),
      date: new Date(),
      title: "Added money",
    });
  }

  return (
    <ScrollView
    style={{ backgroundColor: Colors.background }}
    contentContainerStyle={{
      paddingTop: headerHeight,
    }}
    >
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.balance}>{balance()}</Text>
          <Text style={styles.currency}>$</Text>
        </View>
      </View>
      <View style={styles.actionRow}>
        <RoundBtn icon={"add"} text={"Add money"} onPress={onAddMoney} />
        <RoundBtn
          icon={"refresh"}
          text={"Exchange"}
          onPress={clearTransactions}
        />
        <RoundBtn icon={"list"} text={"Details"} />
        <Dropdown />
      </View>
      <View style={defaultStyles.sectionHeader}>
        <Text>Transactions</Text>
        <View style={styles.transactions}>
          {transactions.length === 0 ? (
            <Text style={{ padding: 2, color: Colors.gray }}>
              No transactions
            </Text>
          ) : (
            transactions.reverse().map((transaction) => (
              <View
                key={transaction.id}
                style={{ flexDirection: "row", alignItems: "center", gap: 16 }}
              >
                <View style={styles.circle}>
                  <Ionicons
                    name={transaction.amount > 0 ? "add" : "remove"}
                    size={24}
                    color={Colors.dark}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "400" }}>{transaction.title}</Text>
                  <Text style={{ color: Colors.gray, fontSize: 12 }}>
                    {transaction.date.toString().slice(0,15)}
                  </Text>
                </View>
                <Text>{transaction.amount}$</Text>
              </View>
            ))
          )}
        </View>
      </View>
      <Text style={defaultStyles.sectionHeader}>Widgets</Text>
      <WidgetList/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  account: {
    margin: 80,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 10,
  },
  balance: {
    fontSize: 50,
    fontWeight: "bold",
  },
  currency: {
    fontSize: 20,
    fontWeight: "500",
    marginLeft: 5,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  transactions: {
    marginTop: 10,
    marginHorizontal: 20,
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 16,
    gap: 20,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
});
