import {
  IonButtons,
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButton,
  IonToast,
} from '@ionic/react';
import './Item.css';
import { RouteComponentProps } from 'react-router';
import { Items } from '../constant';
import { useState } from 'react';

interface ItemPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const Item: React.FC<ItemPageProps> = ({ match }) => {
  const item = Items.find((d) => d.id === Number(match.params.id));
  const [showToast, setShowToast] = useState(false);
  const [isCart, setCart] = useState(localStorage.getItem(String(item?.id)) === 'true');
  const addItemToCart = (id: undefined | number, changeIsCart: boolean) => {
    if (!id) {
      return;
    }
    setCart(changeIsCart);
    localStorage.setItem(String(id), String(changeIsCart));
    setShowToast(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tab1" />
          </IonButtons>
          <IonTitle>{item?.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="card-image">
          <IonImg src={item?.image} />
        </div>
        <div className="ion-padding item-information">
          <h2>{item?.subTitle}</h2>
          <h1>{item?.title}</h1>
          <p>¥{item?.price.toLocaleString()}（税込）</p>
          <p>{item?.description}</p>
          <IonButton expand="block" fill={isCart ? 'outline' : undefined} onClick={() => addItemToCart(item?.id, !isCart)}>
            {!isCart ? 'カートに入れる' : 'カートから削除'}
          </IonButton>
        </div>

        <IonToast color="primary" isOpen={showToast} onDidDismiss={() => setShowToast(false)} message={item?.title + 'を変更しました'} duration={2000} />
      </IonContent>
    </IonPage>
  );
};

export default Item;
