export default class AddressHelper {
  public static getGraphQLServerAddress() {
    return `/graphql`;
  }

  public static getWSServerAddress() {
    if (!window || window.location.hostname === 'localhost') {
      return 'ws://localhost:3001/graphql';
    } else {
      return `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/graphql`;
    }
  }
}
