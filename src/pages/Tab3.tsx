import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar, IonText } from '@ionic/react';
import './Tab3.css';
import { Terms } from '../constant'

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
        <IonList className="ion-padding-end ion-padding-bottom">
          {
            Terms.map(item => (
              <IonItem lines="none">
                <IonLabel position="stacked">{item.label}</IonLabel>
                <IonText>{item.value}</IonText>
              </IonItem>))
          }
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
