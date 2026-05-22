<script setup lang="ts">
import { useCart } from '../composables/useCart'
import CartItemComponent from '../components/CartItemComponent.vue'

const { 
  cartList, 
  isAllChecked, 
  totalItems, 
  totalPrice, 
  removeItem, 
  removeSelectedItems, 
  clearCart 
} = useCart()
</script>

<template>
  <div class="cart-container">
    <!-- 1. 頂部表頭 -->
    <header class="cart-header-row">
      <div class="col-checkbox">
        <label class="select-all-label">
          <input type="checkbox" v-model="isAllChecked" class="custom-checkbox">
          <span>Select all</span>
        </label>
      </div>
      <div class="col-goods">Item</div>
      <div class="col-price">Price</div>
      <div class="col-quantity">Quantity</div>
      <div class="col-subtotal">Sub-total</div>
      <div class="col-action">Action</div>
    </header>

    <!-- 2. 商品列表區 -->
    <section class="cart-items-list">
      <template v-if="cartList.length > 0">
        <CartItemComponent 
          v-for="product in cartList" 
          :key="product.id" 
          :item="product"
          @delete="removeItem"
        />
      </template>
      <div v-else class="cart-empty">
        Your shopping cart is empty.
      </div>
    </section>

    <!-- 3. 底部結算浮動欄 -->
    <footer class="cart-footer-bar">
      <div class="footer-left">
        <label class="select-all-label">
          <input type="checkbox" v-model="isAllChecked" class="custom-checkbox">
          <span>Select all</span>
        </label>
        <div class="operation-group">
          <button type="button" @click="removeSelectedItems" class="btn-text-action">Remove Selected</button>
          <button type="button" @click="clearCart" class="btn-text-action">Clear Cart</button>
        </div>
      </div>
      
      <div class="footer-right">
        <div class="summary-info">
          Total items: <span class="highlight-num">{{ totalItems }}</span>
        </div>
        <div class="summary-price">
          Total: <span class="currency">$</span><span class="total-amount">{{ totalPrice.toFixed(2) }}</span>
        </div>
        <button type="button" class="btn-checkout" :disabled="totalItems === 0">
          Proceed to Checkout
        </button>
      </div>
    </footer>
  </div>
</template>