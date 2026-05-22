<script setup lang="ts">
import { computed } from 'vue'
import type { CartItem } from '../composables/useCart'

const props = defineProps<{
    item: CartItem
}>()

const emit = defineEmits<{
    (e: 'delete', id: number): void
}>()

const subTotal = computed<string>(() => (props.item.price * props.item.quantity).toFixed(2))
</script>

<template>
    <div class="cart-item" :class="{ 'cart-item': item.checked }">
        <div class="col-checkbox">
            <input type="checkbox" v-model="item.checked" class="custom-checkbox">
        </div>

        <div class="col-goods">
            <div class="product">{{ item.name }}</div>
        </div>

        <div class="col-price">
            <span class="price-currency">${{ item.price.toFixed(2) }}</span>
        </div>

        <div class="col-quantity">
            <div class="quantity-counter">
                <button 
                    type="button"
                    class="btn-counter" 
                    @click="item.quantity > 1 && item.quantity--"
                    :disabled="item.quantity <= 1">
                    -
                </button>
                <input type="text" class="quantity-input" :value="item.quantity" readonly>
                <button type="button"class="btn-counter" @click="item.quantity++">+</button>
            </div>
        </div>

        <div class="col-subtotal">
            <span class="price-currecy">$</span>{{ subTotal }}
        </div>
        <div class="col-action">
            <button type="button" class="btn-delete" @click="$emit('delete', item.id)">Delete</button>
        </div>
    </div>
</template>