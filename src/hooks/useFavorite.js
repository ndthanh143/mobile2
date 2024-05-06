import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

export function useFavorite() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getFavorites = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@favorite');

      const result = await (jsonValue != null ? JSON.parse(jsonValue) : []);
      setData(result);
      return result;
    } catch (e) {
      console.error('Error reading cart from AsyncStorage', e);
    } finally {
      setLoading(false);
    }
  };

  const saveFavorite = async cart => {
    try {
      const jsonValue = JSON.stringify(cart);
      await AsyncStorage.setItem('@favorite', jsonValue);
    } catch (e) {
      console.error('Error saving cart to AsyncStorage', e);
    }
  };

  const addItemToFavorite = async item => {
    try {
      const favorites = await getFavorites();
      const findItem = favorites.find(cartItem => cartItem.id === item.id);

      const updatedFavorite = findItem
        ? [...favorites, findItem]
        : [...favorites, item];
      await saveFavorite(updatedFavorite);
      setData(updatedFavorite);
      console.log('Item added to cart');
    } catch (e) {
      console.error('Error adding item to cart', e);
    }
  };

  const removeItemFromFavorite = async itemId => {
    try {
      const cart = await getFavorites();
      const updatedCart = cart.filter(item => item.id !== itemId); // Assuming each item has a unique `id`
      await saveFavorite(updatedCart);
      setData(updatedCart);

      console.log('Item removed from cart');
    } catch (e) {
      console.error('Error removing item from cart', e);
    }
  };

  useEffect(() => {
    const getFavoriteData = async () => {
      await getFavorites();
    };

    getFavoriteData();
  }, []);

  return {
    data,
    isLoading,
    getFavorites,
    saveFavorite,
    addItemToFavorite,
    removeItemFromFavorite,
  };
}
