import { createContext, useContext, useReducer } from "react";

const ClusterContext = createContext(null);
const ClusterDispatchContext = createContext(null);

const ClusterProvider = ({ children }) => {
  const [data, dispatch] = useReducer(reducer, initialState);
  return (
    <ClusterContext.Provider value={data}>
      <ClusterDispatchContext.Provider value={dispatch}>
        {children}
      </ClusterDispatchContext.Provider>
    </ClusterContext.Provider>
  );
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CLUSTER_SIZE":
      return {
        ...state,
        clusterSize: action.payload,
      };
    case "SET_LOOPING_MAX":
      return {
        ...state,
        loopingMax: action.payload,
      };
    case "SET_DATASET":
      return {
        ...state,
        dataset: action.payload,
      };
    case "SET_CLUSTER_RESULT":
      return {
        ...state,
        clusterResult: action.payload,
      };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

const initialState = {
  clusterSize: 3,
  loopingMax: 100,
  dataset: [],
  clusterResult: null,
};

export function useCluster() {
  return useContext(ClusterContext);
}

export function useClusterDispatch() {
  return useContext(ClusterDispatchContext);
}

export { ClusterContext, ClusterDispatchContext };

export default ClusterProvider;
