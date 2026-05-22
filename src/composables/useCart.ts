import { ref, computed } from 'vue'

export interface CartItem {
    id: number
    name: string
    price: number
    quantity: number
    checked: boolean
}

export function useCart() {
    const cartList = ref<CartItem[]>([
        { id: 1, name: 'Premium Wireless Headphones', price: 129.90, quantity: 1, checked: true },
        { id: 2, name: 'Mechanical Gaming Keyboard', price: 89.50, quantity: 1, checked: true },
        { id: 3, name: 'Ergonomic Vertical Mouse', price: 45.00, quantity: 2, checked: false }
    ])

    const isAllChecked = computed<boolean>({
        get: () => cartList.value.length > 0 && cartList.value.every(item => item.checked),
        set: (val: boolean) => {
            cartList.value.forEach(item => item.checked = val)
        }
    })

    const totalItems = computed<number>(() => {
        return cartList.value
            .filter(item => item.checked)
            .reduce((total, item) => total + item.quantity, 0)
    })

    const totalPrice = computed<number>(() => {
        return cartList.value
            .filter(item => item.checked)
            .reduce((total, item) => total + item.price * item.quantity, 0)
    })

    const removeItem = (id: number) => {
        cartList.value = cartList.value.filter(item => item.id !== id)
    }

    const removeSelectedItems = () => {
        cartList.value = cartList.value.filter(item => !item.checked)
    }

    const clearCart = () => {
        cartList.value = []
    }

    return {
        cartList,
        isAllChecked,
        totalItems,
        totalPrice,
        removeItem,
        removeSelectedItems,
        clearCart
    }
}