module Core {
  export interface INavBarController extends ng.IScope{
    workspace : Workspace;
    hash : string;
    validSelection : (uri:string) => bool;
    isCurrentRoute : (string) => bool;
    isLocation : (string) => bool;

    topLevelTabs: () => MenuItem[];
    subLevelTabs: () => MenuItem[];

    isValid: (MenuItem) => bool;
  }

  export function NavBarController($scope:INavBarController, $location:ng.ILocationService, workspace:Workspace) {
    // TODO why do we keep binding the workspace to the scope?
    $scope.workspace = workspace;

    $scope.topLevelTabs = () => $scope.workspace.topLevelTabs;

    $scope.subLevelTabs = () => $scope.workspace.subLevelTabs;

    $scope.validSelection = (uri) => workspace.validSelection(uri);

    $scope.isValid = (nav) => nav.isValid();

    // when we change the view/selection lets update the hash so links have the latest stuff
    $scope.$on('$routeChangeSuccess', function () {
      $scope.hash = workspace.hash();
    });

    $scope.isLocation = (href) => {
      var pathName = $location.path().substring(1) || '';
      var link = href;
      if (href.startsWith("#/")) {
        link = href.substring(2);
      }
      return pathName.startsWith(link);
    };

    $scope.isCurrentRoute = (page) => {
      // TODO Why is 'home' used? It doesn't appear anywhere
      var currentRoute = $location.path().substring(1) || 'home';
      var isCurrentRoute = currentRoute.startsWith(page);
      return isCurrentRoute;
    };
  }
}