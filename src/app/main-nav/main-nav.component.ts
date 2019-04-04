import {Component, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {filter, merge} from 'rxjs/operators';
// import { ListKeyManager } from '@angular/cdk/a11y';
import {UP_ARROW, DOWN_ARROW, ENTER} from '@angular/cdk/keycodes';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';

const clients = ['Goldman Sachs', 'PWC', 'EY', 'Forbes', 'STC', 'Chattered Bank', 'Eastern & co.'];
const symbols = ['AAPL', 'BSE', 'TTS', 'YAHOO', 'STC', 'CYC', 'NSE'];
const sectors = ['Banking', 'Health Care', 'Nutrition', 'Food', 'Industries', 'Servicing', 'Manufacturing'];
const presets = ['Goldman Sachs', 'Barrick gold', 'Fx Exchange', 'Forbes', 'STC', 'Chattered Bank', 'Eastern & co.'];

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '270px',
        paddingTop: '20px'
      })),
      state('closed', style({
        height: '0px',
        paddingTop: '0'
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
    trigger('openCloseLink', [
      state('link-opened', style({
        display: 'inline-block'
      })),
      state('link-closed', style({
        display: 'none'
      })),
      transition('link-opened => link-closed', [
        animate('0.3s')
      ]),
      transition('link-closed => link-opened', [
        animate('0.3s')
      ]),
    ]),
    trigger('openCloseMegaMenu', [
      state('open', style({
        visibility: 'visible'
      })),
      state('close', style({
        visibility: 'none'
      })),
      transition('open => close', [
        animate('0.3s')
      ]),
      transition('close => open', [
        animate('0.3s')
      ]),
    ]),
  ]
})
export class MainNavComponent {
  // keyboardEventsManager: ListKeyManager;
  megaMenuOpened = false;
  searchOpened = false;
  showFullNavigation = false;
  showNavigationMenu = false;
  showLink = false;
  slideColor = 'blue';

  menuItems = [
    {id: '/standard', icon: 'feather icon-bar-chart', clicked: true, link: true, title: 'Standard'},
    {id: '', icon: 'feather icon-activity', clicked: true, link: true, title: 'Dark'},
    {id: '/material', icon: 'feather icon-briefcase', clicked: true, link: true, title: 'Material'},
    {id: '/all', icon: 'feather icon-server', clicked: true, link: true, title: 'All'},
    ];
  menuItemsCopy = this.menuItems.map(x => Object.assign({}, x));
  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>()

  searchClient = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => clients.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );
  searchSymbol = ((text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => symbols.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    ));
  /*symbols.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term =>
    );*/
  searchSector = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => sectors.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );
  searchPreset = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => presets.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  searchItems = [
    {
      id: 'client', icon: 'feather icon-briefcase', clicked: true, submenuWithSearch: true, title: 'Search Client',
      links: [
        {id: '/client', icon: '', clicked: true, searchable: false, title: 'Goldman Sachs'},
        {id: '/client', icon: '', clicked: true, searchable: false, title: 'EY'},
        {id: '/client', icon: '', clicked: true, searchable: false, title: 'PWC'},
        {id: '/client', icon: 'feather icon-plus', clicked: true, searchable: false, title: 'Add New'}
      ],
      searchFn: this.searchClient
    },
    {
      id: '', icon: 'feather icon-trending-up', clicked: true, submenuWithSearch: true, title: 'Search Symbol',
      links: [
        {id: '/', icon: '', clicked: true, searchable: false, title: 'AAPPL'},
        {id: '/', icon: '', clicked: true, searchable: false, title: 'YAHOO'},
        {id: '/', icon: '', clicked: true, searchable: false, title: 'MSN'},
        {id: '/', icon: 'feather icon-plus', clicked: true, searchable: false, title: 'Add New'}
      ],
      searchFn: this.searchSymbol
    },
    {
      id: '', icon: 'feather icon-box', clicked: true, submenuWithSearch: true, title: 'Search Sector',
      links: [
        {id: '/', icon: '', clicked: true, searchable: false, title: 'Trading'},
        {id: '/', icon: '', clicked: true, searchable: false, title: 'Banking'},
        {id: '/', icon: '', clicked: true, searchable: false, title: 'Health care'},
        {id: '/', icon: 'feather icon-plus', clicked: true, searchable: false, title: 'Add New'}
      ],
      searchFn: this.searchSector
    },
    {
      id: '', icon: 'feather icon-server', clicked: true, submenuWithSearch: true, title: 'Search Preset',
      links: [
        {id: '/', icon: '', clicked: true, searchable: false, title: 'Barrick gold'},
        {id: '/', icon: '', clicked: true, searchable: false, title: 'Goldman Sachs'},
        {id: '/', icon: '', clicked: true, searchable: false, title: 'FxExchange'},
        {id: '/', icon: 'feather icon-plus', clicked: true, searchable: false, title: 'Add New'}
      ],
      searchFn: this.searchPreset
    }];
  searchItemsCopy = this.searchItems.map(x => Object.assign({}, x));

  notifications = [
    {
      message: '<a class="notification-link" [routerLink]="/client" href="/#/client">Client ‘1832’</a> just executed a block trade on symbol: ‘XYZ’',
      id: 1
    },
    {message: 'John Smith from ABC Investments has had recent meetings about ‘ABC’', id: 2},
    {message: 'Bob Jones from Mackenzie might be interested in taking a position in ‘GHY’', id: 3},
  ];
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  public model: any;

  ngOnInit() {
    //this.searchClient(new Subject<string>());
  }

  toggleMegaMenu() {
    this.megaMenuOpened = !this.megaMenuOpened;
  }

  clickedOutSearch() {
    if (this.searchOpened) {
      this.searchOpened = false;
    }
  }

  clickedOutMegaMenu() {
    if (this.megaMenuOpened) {
      this.megaMenuOpened = false;
    }
  }

  onEscKeyUp(event) {
    if (event.key === 'Escape') {
      if (this.searchOpened) {
        this.searchOpened = false;
      }

      if (this.megaMenuOpened) {
        this.megaMenuOpened = false;
      }
    }
  }

  toggleSearchMenu() {
    this.searchOpened = !this.searchOpened;
  }

  toggleMenuItem(menuItem) {
    /* if (!menuItem.clicked) {

    } */

    this.showLink = !menuItem.clicked;
    this.menuItems = this.menuItems.map((item) => {
      item.clicked = false;

      return item;
    });
    menuItem.clicked = !menuItem.clicked;
  }

  toggle(event) {
    this.showFullNavigation = event.checked;
  }

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router, private route: ActivatedRoute) {
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(x => {
      this.searchOpened = false;
    })
  }

  /**
   * @author Ahsan Ayaz
   * @desc Triggered when a key is pressed while the input is focused
   */

  /*handleKeyUp(event: KeyboardEvent) {
    event.stopImmediatePropagation();
    if (this.keyboardEventsManager) {
      if (event.keyCode === DOWN_ARROW || event.keyCode === UP_ARROW) {
        // passing the event to key manager so we get a change fired
        this.keyboardEventsManager.onKeydown(event);
        return false;
      } else if (event.keyCode === ENTER) {
        // when we hit enter, the keyboardManager should call the selectItem method of the `ListItemComponent`
        this.keyboardEventsManager.activeItem.selectItem();
        return false;
      }
    }
  }*/

  goToPage(link) {
    this.router.navigateByUrl(`/${link}`);
  }

  mouseEnter(menuItem) {
    if (this.showFullNavigation) {
      return;
    }
    this.showLink = !menuItem.clicked;
    this.menuItems = this.menuItems.map((item) => {
      item.clicked = false;

      return item;
    });
    menuItem.clicked = !menuItem.clicked;
    this.showNavigationMenu = true;
  }

  mouseLeave(menuItem) {
    if (this.showFullNavigation) {
      return;
    }
    this.showNavigationMenu = false;
    this.menuItems = this.menuItems.map((item) => {
      item.clicked = true;

      return item;
    });
  }

  deleteNotification($event, notification) {
    this.notifications = this.notifications.filter((item) => {
      return item.id !== notification.id;
    });
    if (this.notifications.length) {
      $event.preventDefault();
      $event.stopPropagation();
    }
  }

  clearAllNotifications() {
    this.notifications = [];
  }

  onClickMenuItem(event, item) {
    if (!item.link) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  onFocusSearchInput(event, item) {
    item.active = !item.active;
  }

  /*onChangeSubmenuWithSearch($event, item) {
    let itemCopy = this.menuItemsCopy.filter(itemCopy => {
      return itemCopy.title === item.title;
    })[0];
    item.links = itemCopy.links.filter(link => {
      return link.title.toLowerCase().indexOf($event.target.value.toLowerCase()) >= 0;
    });
  }*/

  /*onChangeSearchInput($event, item) {
    let itemCopy = this.searchItemsCopy.filter(itemCopy => {
      return itemCopy.title === item.title;
    })[0];
    item.links = itemCopy.links.filter(link => {
      return link.title.toLowerCase().indexOf($event.target.value.toLowerCase()) >= 0;
    });
  }*/
}
