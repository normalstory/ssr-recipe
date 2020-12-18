//for ssr
// PreloadContext 클래스 컴포넌트 : ssr 랜더링 과정에서 처리해야 할 적업을 실행하고
//    모든 프로미스를 수집하고 수집된 프로미스들이 끝날때까지 기다렸다가 그 다음에 다시 렌더링하면 데이터가 채워진 상태로 컴포넌트들이 나타남
// Preloader 컴포넌트 : resolve라는 함수를 props로 받아오며, 컴포넌트가 렌더링될 때 서버 환경에서만 resolve 호출
import { createContext, useContext } from "react";

//서버환경 : {done:false, promises[]}
const PreloadContext = createContext(null);
export default PreloadContext;

//resolve는 함수 타입
export const Preloader = ({ resolve }) => {
  const preloadContext = useContext(PreloadContext);
  if (!preloadContext) return null; // context 값이 유효하지 않다면 아무것도 하지 않음
  if (preloadContext.done) return null; // 이미 작업이 끝났다면 아무것도 하지 않음

  //promises 배열에 프로미스 등록
  //함수가 프로미스를 반환하지 않더라도 프로미스 취급하기위해
  //Promise.resolve함수 사용
  preloadContext.promises.push(Promise.resolve(resolve()));
  return null;
};
