import {
  collection,
  addDoc,
  getDocs,
  where,
  setDoc,
  getFirestore,
  onSnapshot,
  query,
  doc,
} from "firebase/firestore";
import { firebaseConfig } from "../services/firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes, uploadString } from "firebase/storage";

//Types
import { FeedGrid } from "../types/FeedGrid";
import { Notifications } from "../types/notificationType";
import { SearchTypes } from "../types/searchtypes";
import { initializeApp } from "@firebase/app";
import { Tweet } from "../types/Tweet";
import { Message } from "../types/Messages";
import { mainImgCard } from "../types/main-ImgCard";
import { Audio } from "../types/Audio";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const auth = getAuth();

//Auth
export const saveUser = async (name: any, email: any, password: any) => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      setDoc(doc(db, "users", name), {
        name: name,
        email: email,
      });
    })
    .catch((error) => {
      console.error("Error al crear usuario:", error.code, error.message);
    });
};

export const getUsers = async (email: any, password: any) => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password);
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("se inicio sesion", user);
    return user; // Devuelve el usuario si la autenticación es exitosa
  } catch (error) {
    alert(
      "correo electronico o contraseña invalidos, por favor intentalo de nuevo"
    );
    console.log(`Error al iniciar sesión`, error);
  }
};
//FinAuth

// para mensajes

export const addmessages = async (product: Omit<Message, "id">) => {
  try {
    const where = collection(db, "messages");
    await addDoc(where, product);
    console.log("se añadió con éxito");
  } catch (error) {
    console.error(error);
  }
};

export const getmessage = async () => {
  const querySnapshot = await getDocs(collection(db, "Messages"));
  const transformed: Array<Message> = [];

  querySnapshot.forEach((doc) => {
    const data: Omit<Message, "id"> = doc.data() as any;
    transformed.push({ id: doc.id, ...data });
  });

  return transformed;
};

const getProductsListener = (cb: (docs: Message[]) => void) => {
  const ref = collection(db, "products");

  onSnapshot(ref, (collection) => {
    const docs: Message[] = collection.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    })) as Message[];
    cb(docs);
  });
};
//Fin Mensajes

// para tweets
export const addtweet = async (product: Omit<Tweet, "id">) => {
  try {
    const where = collection(db, "Tweet");
    await addDoc(where, product);
    console.log("se añadió con éxito");
  } catch (error) {
    console.error(error);
  }
};

export const getTweet = async () => {
  const querySnapshot = await getDocs(collection(db, "Tweet"));
  const transformed: Array<Tweet> = [];

  querySnapshot.forEach((doc) => {
    const data: Omit<Tweet, "id"> = doc.data() as any;
    transformed.push({ id: doc.id, ...data });
  });

  return transformed;
};

const getTweetListener = (cb: (docs: Tweet[]) => void) => {
  const ref = collection(db, "products");

  onSnapshot(ref, (collection) => {
    const docs: Tweet[] = collection.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    })) as Tweet[];
    cb(docs);
  });
};
//Fin Tweets

// para main-ImgCards

export const addmain = async (product: Omit<mainImgCard, "id">) => {
  try {
    const where = collection(db, "main-ImgCard");
    await addDoc(where, product);
    console.log("se añadió con éxito");
  } catch (error) {
    console.error(error);
  }
};

export const getmain = async () => {
  const querySnapshot = await getDocs(collection(db, "main-ImgCard"));
  const transformed: Array<mainImgCard> = [];

  querySnapshot.forEach((doc) => {
    const data: Omit<mainImgCard, "id"> = doc.data() as any;
    transformed.push({ id: doc.id, ...data });
  });

  return transformed;
};

const getMainListener = (cb: (docs: mainImgCard[]) => void) => {
  const ref = collection(db, "products");

  onSnapshot(ref, (collection) => {
    const docs: mainImgCard[] = collection.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    })) as mainImgCard[];
    cb(docs);
  });
};
//Fin ImgCards

//para Audio
export const addAudio = async (product: Omit<Audio, "id">) => {
  try {
    const where = collection(db, "Audio");
    await addDoc(where, product);
    console.log("se añadió con éxito");
  } catch (error) {
    console.error(error);
  }
};

export const getAudio = async () => {
  const querySnapshot = await getDocs(collection(db, "Audio"));
  const transformed: Array<Audio> = [];

  querySnapshot.forEach((doc) => {
    const data: Omit<Audio, "id"> = doc.data() as any;
    transformed.push({ id: doc.id, ...data });
  });

  return transformed;
};

const getaudioListener = (cb: (docs: Audio[]) => void) => {
  const ref = collection(db, "products");

  onSnapshot(ref, (collection) => {
    const docs: Audio[] = collection.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    })) as Audio[];
    cb(docs);
  });
};
//Fin Audio

//para comentar 
export const addComment = async (comment: string) => {
  try {
    const commentData = collection(db, "comments");
    await addDoc(commentData, { comment }); // Agrega el comentario como un objeto en Firestore
    console.log("Se añadió un comentario");
  } catch (error) {
    console.error(error);
  }
}


//FeedGrid
export const addFeedGrid = async (product: Omit<FeedGrid, "id">) => {
  try {
    const where = collection(db, "FeedGrid");
    await addDoc(where, product);
    console.log("se añadió con éxito");
  } catch (error) {
    console.error(error);
  }
};

export const getFeedGrid = async () => {
  const querySnapshot = await getDocs(collection(db, "FeedGrid"));
  const transformed: Array<FeedGrid> = [];

  querySnapshot.forEach((doc) => {
    const data: Omit<FeedGrid, "id"> = doc.data() as any;
    transformed.push({ id: doc.id, ...data });
  });

  return transformed;
};

const getFeedGridlistener = (cb: (docs: FeedGrid[]) => void) => {
  const ref = collection(db, "FeedGrid");

  onSnapshot(ref, (collection) => {
    const docs: FeedGrid[] = collection.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    })) as FeedGrid[];
    cb(docs);
  });
};
//Fin FeedGrid
//para comentar 

export const getComment = async () => {
  const querySnapshot = await getDocs(collection(db, "Comment"));
  const commented: any = [];

  querySnapshot.forEach((doc) => {
    const comment = doc.data();
    commented.push({
      id: doc.id,
      ...comment,
    });
  });
  return commented;
};

//fin de comentar 
//Para Notifications
export const addNotifications = async (product: Omit<Notifications, "id">) => {
  try {
    const where = collection(db, "Notifications");
    await addDoc(where, product);
    console.log("se añadió con éxito");
  } catch (error) {
    console.error(error);
  }
};

export const getNotifications = async () => {
  const querySnapshot = await getDocs(collection(db, "Notifications"));
  const transformed: Array<Notifications> = [];

  querySnapshot.forEach((doc) => {
    const data: Omit<Notifications, "id"> = doc.data() as any;
    transformed.push({ id: doc.id, ...data });
  });

  return transformed;
};

const getNotificationslistener = (cb: (docs: Notifications[]) => void) => {
  const ref = collection(db, "Notifications");

  onSnapshot(ref, (collection) => {
    const docs: Notifications[] = collection.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    })) as Notifications[];
    cb(docs);
  });
};
//Fin Notifications

//Search
export const addSearchTypes = async (product: Omit<SearchTypes, "id">) => {
  try {
    const where = collection(db, "Search");
    await addDoc(where, product);
    console.log("se añadió con éxito");
  } catch (error) {
    console.error(error);
  }
};

export const getSearchTypes = async () => {
  const querySnapshot = await getDocs(collection(db, "Search"));
  const transformed: Array<SearchTypes> = [];

  querySnapshot.forEach((doc) => {
    const data: Omit<SearchTypes, "id"> = doc.data() as any;
    transformed.push({ id: doc.id, ...data });
  });

  return transformed;
};

const getSearchTypeslistener = (cb: (docs: SearchTypes[]) => void) => {
  const ref = collection(db, "SearchTypes");

  onSnapshot(ref, (collection) => {
    const docs: SearchTypes[] = collection.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    })) as SearchTypes[];
    cb(docs);
  });
};
//Fin Search

//Create Account
// const CreateAccount = async (name: string, email: string, password: string) => {
//   try {
//     // Validar el formato del correo electrónico
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       console.error("Correo electrónico no válido");
//       return;
//     }

//     // Primer paso: Crear usuario con auth
//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     const user = userCredential.user;

//     console.log(user.uid);

//     // Segundo paso: Crear datos del usuario en la colección users
//     const userDocRef = doc(db, "users", user.uid);
//     const userData = {
//       name: name,
//       email: email,
//     };

//     await setDoc(userDocRef, userData);

//     console.log("Se añadió");
//   } catch (error) {
//     console.error(error);
//   }
// };

//LogIn
// const logIn = (email: string, password: string) => {
//   signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       const user = userCredential.user;
//       console.log(user.uid);
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.error(errorMessage);
//     });
// };

export default {
  //   CreateAccount,
  //   logIn,
  saveUser,
  addmessages,
  getmessage,
  getProductsListener,
  getTweet,
  getTweetListener,
  addmain,
  getmain,
  getMainListener,
  addAudio,
  getAudio,
  getaudioListener,
  addComment,
  getComment,
  addFeedGrid,
  getFeedGrid,
  getFeedGridlistener,
  addNotifications,
  getNotifications,
  getNotificationslistener,
  addSearchTypes,
  getSearchTypes,
  getSearchTypeslistener,
};
