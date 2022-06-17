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
  IonToolbar,
  IonCheckbox,
  IonText,
  IonFooter,
  IonButtons,
  IonButton,
  IonItemDivider,
  useIonViewWillEnter,
} from '@ionic/react';
import './Tab2.css';
import { Items } from '../constant';
import { useMemo, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { useCapacitorStripe } from '@capacitor-community/stripe/dist/esm/react/provider';

type IChecked = {
  val: number;
  isChecked: boolean;
};

const Tab2: React.FC = () => {
  useIonViewWillEnter(() => {
    setRadioChecked(getRadioChecked());
  });
  const getRadioChecked = (): IChecked[] => {
    return Items.map((d) => ({
      val: d.id,
      isChecked: localStorage.getItem(String(d.id)) === 'true',
    }));
  };
  const [radioChecked, setRadioChecked] = useState(getRadioChecked());
  const setChecked = (id: number, val: boolean) => {
    localStorage.setItem(String(id), String(val));
    setRadioChecked(getRadioChecked());
  };

  /**
   * カート内商品の情報を計算
   */
  const { amount, quantity } = useMemo(() => {
    const selectedItems: number[] = radioChecked
      .filter((checked) => checked.isChecked)
      .map((checked) => {
        return Items.find((item) => item.id === checked.val)!.price | 0;
      });
    const amount = selectedItems.reduce((sum, element) => {
      return sum + element;
    }, 0);
    return {
      quantity: selectedItems.length,
      amount,
    };
  }, [radioChecked]);

  const { stripe } = useCapacitorStripe();
  const submitPayment = async () => {
    if (!Capacitor.isNativePlatform) {
      // for Web
    } else {
    }

    if (true) {
      // 成功した場合
      localStorage.clear();
    } else {
      // 失敗した場合
    }
  };
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
          <IonItemDivider>
            <IonLabel>商品一覧</IonLabel>
          </IonItemDivider>
          {Items.map((d, i) => (
            <IonItem key={i} lines={Items.length === i + 1 ? 'full' : undefined}>
              <IonCheckbox slot="start" checked={radioChecked.find((check) => check.val === d.id)?.isChecked === true} onIonChange={(e) => setChecked(d.id, e.detail.checked)} />
              <IonAvatar slot="start">
                <IonImg src={d.image}></IonImg>
              </IonAvatar>
              <IonLabel>{d.title}</IonLabel>
              <IonText slot="end">¥{d.price.toLocaleString()}</IonText>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
      <IonFooter>
        <IonToolbar color="primary">
          <IonText slot="end" class="ion-margin-end ion-align-self-center">
            {quantity}点 合計 ¥{amount}円（税込）
          </IonText>
          <IonButtons slot="end">
            <IonButton fill="outline" onClick={submitPayment}>
              決済する
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Tab2;
