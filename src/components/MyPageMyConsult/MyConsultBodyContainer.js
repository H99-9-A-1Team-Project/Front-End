import ConsultBoxAnswered from './ConsultBoxAnswered';
import ConsultBoxFinish from './ConsultBoxFinish';
import ConsultBoxWait from './ConsultBoxWait';

export default function MyConsultBodyContainer({ listState, realtorListState, item, setSearchState }) {
  if (listState === 0) {
    if (item.answerState === 'WAIT') {
      return <ConsultBoxWait item={item} setSearchState={setSearchState} />;
    }
    if (item.answerState === 'ANSWER') {
      return <ConsultBoxAnswered item={item} setSearchState={setSearchState} />;
    }
    if (item.answerState === 'FINISH') {
      return <ConsultBoxFinish item={item} setSearchState={setSearchState} />;
    }
  }
  if (listState === 1) {
    if (item.answerState === 'WAIT') {
      return <ConsultBoxWait item={item} setSearchState={setSearchState} />;
    }
  }
  if (listState === 2) {
    if (item.answerState === 'ANSWER') {
      return <ConsultBoxAnswered item={item} setSearchState={setSearchState} />;
    }
    if (item.answerState === 'FINISH') {
      return <ConsultBoxFinish item={item} setSearchState={setSearchState} />;
    }
  }
  if (realtorListState === 0) {
    if (item.answerState === 'WAIT') {
      return <ConsultBoxWait item={item} setSearchState={setSearchState} />;
    }
  }
  if (realtorListState === 1) {
    if (item.answerState === 'ANSWER' || item.answerState === 'FINISH') {
      return <ConsultBoxFinish item={item} setSearchState={setSearchState} />;
    }
  }
}
