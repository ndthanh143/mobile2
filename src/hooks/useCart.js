import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

export function useCart() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getCart = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@cart');

      const result = await (jsonValue != null ? JSON.parse(jsonValue) : []);
      setData(result);
      return result;
    } catch (e) {
      console.error('Error reading cart from AsyncStorage', e);
    } finally {
      setLoading(false);
    }
  };

  const saveCart = async cart => {
    try {
      const jsonValue = JSON.stringify(cart);
      await AsyncStorage.setItem('@cart', jsonValue);
    } catch (e) {
      console.error('Error saving cart to AsyncStorage', e);
    }
  };

  const addItemToCart = async item => {
    try {
      console.log('item', item);
      const cart = await getCart();
      const updatedCart = [...cart, item];
      await saveCart(updatedCart);
      setData(updatedCart);
      console.log('Item added to cart');
    } catch (e) {
      console.error('Error adding item to cart', e);
    }
  };

  const removeItemFromCart = async itemId => {
    try {
      const cart = await getCart();
      const updatedCart = cart.filter(item => item.id !== itemId); // Assuming each item has a unique `id`
      await saveCart(updatedCart);
      setData(updatedCart);

      console.log('Item removed from cart');
    } catch (e) {
      console.error('Error removing item from cart', e);
    }
  };

  useEffect(() => {
    const getCartData = async () => {
      await getCart();
    };

    getCartData();
  }, []);

  return {
    data,
    isLoading,
    getCart,
    saveCart,
    addItemToCart,
    removeItemFromCart,
  };
}
