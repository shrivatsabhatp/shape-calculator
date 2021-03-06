import AdVerticalBanner from '../../components/AdVerticalBanner/AdVerticalBanner';
import Header from '../../components/Header';
import HomeDescriptionBlock from '../../components/HomeDescriptionBlock';
import UserInteractionCard from '../../components/UserInteractionCard';
import { Provider } from '../../provider/stepsProvider';
import styles from './App.module.scss';

const App = () => {
  return (
    <div className={styles.App}>
      <Header />
      <section>
        <HomeDescriptionBlock />
        <Provider>
          <UserInteractionCard />
        </Provider>
        <AdVerticalBanner>{null}</AdVerticalBanner>
      </section>
    </div>
  );
};

export default App;
