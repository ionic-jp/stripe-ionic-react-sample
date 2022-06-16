import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar, IonCheckbox, IonText, IonFooter, IonButtons, IonButton, IonItemDivider, useIonViewWillEnter
} from '@ionic/react';
import './Tab2.css';
import {Items} from '../Items';
import {useState} from 'react';

type IChecked = {
  val: number;
  isChecked: boolean;
}

const Tab2: React.FC = () => {
  useIonViewWillEnter(() => {
    setRadioChecked(getRadioChecked());
  });
  const getRadioChecked = (): IChecked[] => {
    return Items.map(d => ({
      val: d.id,
      isChecked: localStorage.getItem(String(d.id)) === 'true'
    }));
  }
  const getSumPrice = (checkedItems: IChecked[]): number => {
    const selectedItems: number[] = checkedItems.map((checked) => {
      if (!checked.isChecked) {
        return 0;
      }
      return Items.find(item => item.id === checked.val)!.price | 0;
    })
    return selectedItems.reduce((sum, element) => {
      return sum + element;
    }, 0);
  }
  const [radioChecked, setRadioChecked] = useState(getRadioChecked());
  const setChecked = (id: number, val: boolean) => {
    localStorage.setItem(String(id), String(val));
    setRadioChecked(getRadioChecked());
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>カート</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">カート</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonItem>
            <IonLabel position="fixed">受取方法</IonLabel>
            <IonText slot="end">対面受取</IonText>
          </IonItem>
          <IonItem lines="full">
            <IonLabel position="fixed">決済方法</IonLabel>
            <IonText slot="end">オンライン決済</IonText>
          </IonItem>
          <IonItemDivider><IonLabel>商品一覧</IonLabel></IonItemDivider>
          {Items.map((d, i) =>
            <IonItem key={i} lines={Items.length === i + 1 ? 'full' : undefined}>
              <IonCheckbox slot="start"
                           checked={radioChecked.find(check => check.val === d.id)?.isChecked === true}
                           onIonChange={e => setChecked(d.id, e.detail.checked)}
              />
              <IonAvatar slot="start">
                <IonImg src={d.image}></IonImg>
              </IonAvatar>
              <IonLabel>{d.title}</IonLabel>
              <IonText slot="end">¥{d.price.toLocaleString()}</IonText>
            </IonItem>
          )}
        </IonList>
      </IonContent>
      <IonFooter>
        <IonToolbar color="primary">
          <IonText slot="end" class="ion-margin-end ion-align-self-center">
            {radioChecked.filter(d => d.isChecked).length}点
            合計 ¥{getSumPrice(radioChecked)}円（税込）
          </IonText>
          <IonButtons slot="end">
            <IonButton fill="outline">決済する</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Tab2;
