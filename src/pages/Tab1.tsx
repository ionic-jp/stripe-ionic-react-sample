import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonImg, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css';
import { Items } from '../constant';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>商品リスト</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">商品リスト</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {Items.map((d, index) => (
            <IonCard button={true} key={index}>
              <div className="card-image">
                <IonImg src={d.image} />
              </div>
              <IonCardHeader>
                <IonCardSubtitle>{d.subTitle}</IonCardSubtitle>
                <IonCardTitle>{d.title}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p>¥{d.price.toLocaleString()}（税込）</p>
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
