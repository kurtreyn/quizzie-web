import {
  ref,
  deleteObject,
  getDownloadURL,
  uploadBytes,
  listAll,
} from "firebase/storage";
import {
  serverTimestamp,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  arrayRemove,
  collection,
} from "firebase/firestore";
import { db, storage, postsRef } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import AlertClass from "./AlertClass";

export default class FirebaseClass {
  email;
  password;
  posts;
  progress;
  collectionRef;
  dir;
  subdir;

  setEmail(givenEmail) {
    this.email = givenEmail;
  }

  setPassword(givenPassword) {
    this.password = givenPassword;
  }

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.password;
  }

  setPosts(givenPosts) {
    this.posts = givenPosts;
  }

  getPosts() {
    return this.posts;
  }

  setProgress(givenProgress) {
    this.progress = givenProgress;
  }

  getProgress() {
    return this.progress;
  }

  setCollectionRef(givenCollectionRef) {
    this.collectionRef = givenCollectionRef;
  }

  getCollectionRef() {
    return this.collectionRef;
  }

  setDir(givenDir) {
    this.dir = givenDir;
  }

  getDir() {
    return this.dir;
  }

  setSubdir(givenSubdir) {
    this.subdir = givenSubdir;
  }

  getSubdir() {
    return this.subdir;
  }

  removeExtension(file) {
    const finalName = file.split(".").slice(0, -1).join(".");
    return finalName;
  }

  async fetchPosts() {
    onSnapshot(postsRef, (snapshot) => {
      const results = snapshot.docs.map((doc) => {
        return { ...doc.data(), key: doc.id };
      });
      return results;
    });
  }

  async uploadSingleImage(givenImage, name_of_quiz, current_user) {
    const extension = ".png";
    const downloadURLs = [];
    const imageName = this.removeExtension(givenImage.name) + extension;
    const imgRef = ref(
      storage,
      `${current_user.email}/postImages/${name_of_quiz}/${imageName}`
    );
    const uploadTask = await uploadBytes(imgRef, givenImage);
    const downloadURL = await getDownloadURL(uploadTask.ref);
    downloadURLs.push(downloadURL);

    return downloadURLs;
  }

  // async uploadImages(givenImages, postId, current_user) {
  //   const extension = ".png";
  //   const downloadURLs = [];
  //   for (let i = 0; i < givenImages.length; i++) {
  //     const imageName = this.removeExtension(givenImages[i].name) + extension;
  //     const imgRef = ref(
  //       storage,
  //       `${current_user.email}/postImages/${postId}/${imageName}`
  //     );
  //     const uploadTask = await uploadBytes(imgRef, givenImages[i]);
  //     const downloadURL = await getDownloadURL(uploadTask.ref);
  //     downloadURLs.push(downloadURL);
  //   }
  //   return downloadURLs;
  // }

  async addImageQuiz(current_user, name_of_quiz, quizSet, postId) {
    const ac = new AlertClass();
    const postRef = doc(db, "users", `${current_user.email}`, "posts", postId);

    try {
      await setDoc(postRef, {
        owner_uid: current_user.uid,
        owner_email: current_user.email,
        subject_name: name_of_quiz,
        post_q_a: quizSet,
        createdAt: serverTimestamp(),
      });
      ac.successAlert("Quiz added successfully");
    } catch (error) {
      ac.errorAlert("Error adding quiz", error);
    }
  }

  async updatePost(postId, newTitle, newTxtCont, newPrice) {
    const ac = new AlertClass();
    const postRef = doc(db, "posts", postId);

    updateDoc(postRef, {
      title: newTitle ? newTitle : null,
      txt_cont: newTxtCont ? newTxtCont : null,
      price: newPrice ? newPrice : null,
    })
      .then(() => {
        ac.successAlert("Post updated successfully");
      })
      .catch((error) => {
        ac.errorAlert("Error updating post", error);
      });
  }

  // async updateTextPost(
  //   postId,
  //   newTitle,
  //   newTxtCont,
  //   page,
  //   pageParag,
  //   txtOnly = true
  // ) {
  //   const ac = new AlertClass();
  //   const postRef = doc(db, "posts", postId);

  //   updateDoc(postRef, {
  //     title: newTitle,
  //     txt_cont: newTxtCont,
  //     page: page,
  //     page_parag: pageParag,
  //     only_text: txtOnly,
  //   })
  //     .then(() => {
  //       ac.successAlert("Updated successfully");
  //     })
  //     .catch((error) => {
  //       ac.errorAlert("Error updating post", error);
  //     });
  // }

  async addNewPostImages(postId, currentImages, newImages) {
    const ac = new AlertClass();
    const postRef = doc(db, "posts", postId);
    let allImages = [];
    this.uploadImages(newImages, postId).then((downloadURLs) => {
      allImages = [...currentImages, ...downloadURLs];
      updateDoc(postRef, { images: allImages })
        .then(() => {
          ac.successAlert("Images updated successfully");
        })
        .catch((error) => {
          ac.errorAlert("Error updating images", error);
        });
    });
  }

  async getPostImageNames(postId) {
    const storageRef = ref(storage, `postImages/${postId}/`);
    const imageNames = [];
    await listAll(storageRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          imageNames.push(itemRef.name);
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
    return imageNames;
  }

  async getImageNameFromUrl(imgLinkInPostObj) {
    const httpsReference = ref(storage, `${imgLinkInPostObj}`);
    let filename = httpsReference.name;
    console.log("filename: ", filename);
    return filename;
  }

  // async removeImageFromPost(postId, imgLinkInPostObj, current_user) {
  //   const ac = new AlertClass();
  //   const postRef = doc(db, "users", `${current_user.email}`, `posts`, postId);

  //   if (imgLinkInPostObj) {
  //     console.log("imgLinkInPostObj", imgLinkInPostObj);
  //     updateDoc(postRef, { images: arrayRemove(imgLinkInPostObj) })
  //       .then(() => {
  //         ac.successAlert("Images removed successfully from post");
  //       })
  //       .catch((error) => {
  //         ac.errorAlert("Error removing images", error);
  //       });
  //   } else {
  //     console.error("imgLinkInPostObj is undefined");
  //   }
  // }

  async deletePostImage(postId, imgName, quizName, current_user) {
    const imgRef = ref(
      storage,
      `${current_user.email}/postImages/${quizName}/${imgName}`
    );

    deleteObject(imgRef);
  }

  async deletePost(postId, current_user, quizName) {
    const postRef = doc(db, "users", `${current_user.email}`, `posts`, postId);
    const storageRef = ref(
      storage,
      `${current_user.email}/postImages/${quizName}`
    );
    const imageNames = [];
    await listAll(storageRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          imageNames.push(itemRef.name);
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
    imageNames.forEach((imgName) => {
      this.deletePostImage(postId, imgName, quizName, current_user);
    });
    await deleteDoc(postRef);
  }
}
