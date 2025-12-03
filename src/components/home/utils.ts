import type { CardData } from "@/components/home/types"
import type { Transaction as TransactionType } from "@/components/transaction"
import type {
  Transaction as ApiTransaction,
  Card as ApiCard,
} from "@/lib/api/types"

export function mapApiTransactionToComponent(
  apiTransaction: ApiTransaction
): TransactionType {
  let type: "subscription" | "income" | "expense"
  switch (apiTransaction.transactionType) {
    case "SUS":
      type = "subscription"
      break
    case "CASH_IN":
      type = "income"
      break
    case "CASH_OUT":
      type = "expense"
      break
    default:
      type = "expense"
  }

  const date = new Date(apiTransaction.date)
  const formattedDate = date.toLocaleDateString("es-AR", {
    day: "numeric",
    month: "short",
  })

  // Create description based on transaction type
  let description = formattedDate
  if (apiTransaction.transactionType === "SUS") {
    description = "Pago de suscripción"
  } else if (apiTransaction.transactionType === "CASH_IN") {
    description = "Pago recibido"
  } else if (apiTransaction.transactionType === "CASH_OUT") {
    description = "Pago enviado"
  }

  return {
    id: apiTransaction.id,
    type,
    name: apiTransaction.title,
    description,
    amount: apiTransaction.amount,
  }
}

export function mapApiCardToCardData(apiCard: ApiCard): CardData {
  const balanceStr = apiCard.balance.replace(/[^\d.-]/g, "")
  const balanceUSD = parseFloat(balanceStr) || 0

  return {
    id: apiCard.id.toString(),
    cardNumber: apiCard.lastDigits.toString().padStart(4, "0"),
    cardName: apiCard.name,
    expDate: apiCard.expDate,
    balanceUSD,
    issuer: apiCard.issuer,
  }
}
