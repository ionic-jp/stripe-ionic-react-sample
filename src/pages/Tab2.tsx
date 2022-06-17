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
    const api = process.env.REACT_APP_API_URL || 'https://j3x0ln9gj7.execute-api.ap-northeast-1.amazonaws.com/dev/';
    try {
      /**
       * webで、Checkout Session APIが用意できている場合のみ、Checkoutを利用する
       */
      if (!Capacitor.isNativePlatform() && process.env.REACT_APP_API_URL) {
        /**
         * Checkout Sessionを作成する
         */
        const { url } = await fetch(`${api}checkout-session`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: radioChecked
              .filter((checked) => checked.isChecked)
              .map((checked) => {
                const item = Items.find((item) => item.id === checked.val);
                if (!item) return null;
                return {
                  amount: item.price,
                  currency: 'jpy',
                  name: item.title,
                };
              })
              .filter(Boolean),
          }),
        }).then(async (res) => {
          /**
           * APIがエラーを出した場合は、アラートでメッセージを出す
           */
          const r = await res.json();
          if (res.ok) return r.url;
          console.log(r);
          window.alert(r.message);
        });
        /**
         * Checkout Sessionが作成できていたら、新しいタブを開く
         */
        if (url) window.open(url);
      } else {
        /**
         * Payment Intentを作成する
         */
        const { customer, paymentIntent, ephemeralKey } = await fetch(`${api}without-customer`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount,
            currency: 'jpy',
          }),
        }).then((res) => res.json());

        /**
         * Payment Sheetを作成
         */
        await stripe.createPaymentSheet({
          paymentIntentClientSecret: paymentIntent,
          customerId: customer,
          customerEphemeralKeySecret: ephemeralKey,
          merchantDisplayName: 'ionic-workshop',
        });

        /**
         * Payment Sheetを表示
         */
        await stripe.presentPaymentSheet();
      }
      // 成功した場合
      localStorage.clear();
    } catch (e) {
      // 失敗した場合
      console.log(e);
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
