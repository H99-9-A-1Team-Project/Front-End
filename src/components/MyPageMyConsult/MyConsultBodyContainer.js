import ConsultBoxAnswered from './ConsultBoxAnswered';
import ConsultBoxFinish from './ConsultBoxFinish';
import ConsultBoxWait from './ConsultBoxWait';

export default function MyConsultBodyContainer({ listState, realtorListState, item }) {
  if (listState === 0) {
    if (item.answerState === 'WAIT') {
      return <ConsultBoxWait item={item} />;
    }
    if (item.answerState === 'ANSWER') {
      return <ConsultBoxAnswered item={item} />;
    }
    if (item.answerState === 'FINISH') {
      return <ConsultBoxFinish item={item} />;
    }
  }
  if (listState === 1) {
    if (item.answerState === 'WAIT') {
      return <ConsultBoxWait item={item} />;
    }
  }
  if (listState === 2) {
    if (item.answerState === 'ANSWER') {
      return <ConsultBoxAnswered item={item} />;
    }
    if (item.answerState === 'FINISH') {
      return <ConsultBoxFinish item={item} />;
    }
  }
  if (realtorListState === 0) {
    if (item.answerState === 'WAIT') {
      return <ConsultBoxWait item={item} />;
    }
  }
  if (realtorListState === 1) {
    if (item.answerState === 'ANSWER' || item.answerState === 'FINISH') {
      return <ConsultBoxFinish item={item} />;
    }
  }
}
