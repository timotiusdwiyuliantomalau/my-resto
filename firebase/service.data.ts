import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "./initialize";
import { Alert } from "react-native";
import { useAuth } from "@/app/auth/auth_provider";

export async function getCategories() {
  try {
    // let data = await fetch(
    //   "https://www.themealdb.com/api/json/v1/1/search.php?s=Chicken"
    // );
    // const datas = await data.json();
    const data = await getDoc(doc(firestore, "menus", "categories"));
    return data.data();
  } catch (err) {
    console.error(err);
  }
}
export async function getLists() {
  try {
    const res = await getDoc(doc(firestore, "menus", "list"));
    return res.data();
  } catch (err) {
    console.error(err);
  }
}

export async function updateMenu() {
  try {
    const categories = [
      "Chicken",
      "Cake",
      "Lamb",
      "Seafood",
      "Dessert",
      "Pasta",
      "Steak",
      "Bread",
      "Breakfast",
      "Fish",
      "Pork",
      "Rice",
      "Salad",
      "Goat",
      "Bean",
      "Soup",
      "Vegetarian",
      "Spaghetti",
    ];
    let arr = [];
    for (let i = 0; i < categories.length; i++) {
      let data = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${categories[i]}`
      );
      let datas = await data.json();
      // if (!data.ok) continue;
      let count = 0;
      while (count < 5) {
        if (datas.meals && datas.meals[count]) {
          let angka = Math.ceil(Math.random() * 20);
          let rating = "4." + Math.floor(Math.random() * 10).toString();
          let duration = Math.floor(Math.random() * (60 - 30 + 1)) + 30;
          angka = angka < 10 ? angka + 10 : angka;
          datas.meals[count].price = angka;
          datas.meals[count].rating = rating;
          datas.meals[count].duration = duration;
        }
        datas.meals &&
          datas.meals[count]?.strMealThumb &&
          arr.push(datas.meals[count]);
        count++;
      }
    }
    await updateDoc(doc(firestore, "menus", "list"), {
      data: JSON.stringify(arr),
    });
  } catch (err) {
    console.error(err);
  }

  // data = await fetch(
  //   "https://www.themealdb.com/api/json/v1/1/search.php?s=Cake"
  // );
  // datas = await data.json();
  // count = 0;
  // while (count < 5) {
  //   datas.meals[count] && arr.push(datas.meals[count]);
  //   count++;
  // }
  // data = await fetch(
  //   "https://www.themealdb.com/api/json/v1/1/search.php?s=Lamb"
  // );
  // datas = await data.json();
  // count = 0;
  // while (count < 5) {
  //   datas.meals[count] && arr.push(datas.meals[count]);
  //   count++;
  // }
}

export async function handleAddToCart(
  cart: object[],
  id: string,
  item: any,
  qty: number,
  callback: any
) {
  try {
    cart.push({ item, qty });
    await updateDoc(doc(firestore, "users", id), { cart });
    callback(cart);
    Alert.alert("Added to cart!");
  } catch (err: any) {
    Alert.alert(err.message);
  }
}

export async function getCart(id: string, callback: any) {
  const data = await getDoc(doc(firestore, "users", id));
  callback(data.data()?.cart);
}
