import {IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar, IonText} from '@ionic/react';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>特商法表記</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">特商法表記</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList className='ion-padding-end ion-padding-bottom'>
          <IonItem lines="none">
            <IonLabel position="stacked">販売業者</IonLabel>
            <IonText>一般社団法人リレーションデザイン研究所</IonText>
          </IonItem>
          <IonItem lines="none">
            <IonLabel position="stacked">代表責任者</IonLabel>
            <IonText>榊原昌彦</IonText>
          </IonItem>
          <IonItem lines="none">
            <IonLabel position="stacked">所在地</IonLabel>
            <IonText>〒530-0001 大阪府大阪市北区梅田1-1-3大阪駅前第3ビル 29階　1-1-1号室</IonText>
          </IonItem>
          <IonItem lines="none">
            <IonLabel position="stacked">電話番号</IonLabel>
            <IonText>050-5240-6289</IonText>
          </IonItem>
          <IonItem lines="none">
            <IonLabel position="stacked">電話受付時間</IonLabel>
            <IonText>10:00 〜 19:00</IonText>
          </IonItem>
          <IonItem lines="none">
            <IonLabel position="stacked">メールアドレス</IonLabel>
            <IonText>info@rdlabo.jp</IonText>
          </IonItem>
          <IonItem lines="none">
            <IonLabel position="stacked">販売価格</IonLabel>
            <IonText>各商品の紹介ページに記載している価格とします。</IonText>
          </IonItem>
          <IonItem lines="none">
            <IonLabel position="stacked">商品代金以外に必要な料金</IonLabel>
            <IonText>消費税</IonText>
          </IonItem>
          <IonItem lines="none">
            <IonLabel position="stacked">引き渡し時期</IonLabel>
            <IonText>ご注文から7日以内に対面販売</IonText>
          </IonItem>
          <IonItem lines="none">
            <IonLabel position="stacked">お支払い方法とお支払いの時期</IonLabel>
            <IonText>クレジットカード決済：ご注文時にお支払いが確定します。</IonText>
          </IonItem>
          <IonItem lines="none">
            <IonLabel position="stacked">返品・交換・キャンセルについて</IonLabel>
            <IonText>商品お渡し後の返品・交換・キャンセルには、基本的に対応しておりません。</IonText>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
