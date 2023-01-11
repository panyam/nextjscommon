import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Auth } from "./Auth";
import HomeButton from "./public/icons/homebutton.jpg";
import SearchButton from "./public/icons/search.png";

export class Header extends React.Component<{
    searchSubmitted?: (term: string) => void,
    hideHomeButton?: boolean,
    showLoginButton?: boolean,
    showLogoutButton?: boolean,
    showSearchButton?: boolean,
    hideDefaultMenuButtons?: boolean,
    searchResultsPanel?: any,
    extraMenuItems?: [string, string, string][],
    logoContents?: any,
    styles?: any,
    auth?: Auth,
  }> {
  menuButtonRef = React.createRef<HTMLInputElement>();
  searchButtonRef = React.createRef<HTMLInputElement>();
  searchSubmitButtonRef = React.createRef<HTMLInputElement>();
  searchInputRef = React.createRef<HTMLInputElement>();
  searchFormRef = React.createRef<HTMLFormElement>();
  state: any = {};

  constructor(props: any, context: any) {
    super(props, context);
    this.state = {
      extraMenuItems: this.props.extraMenuItems || [],
      logoContents: this.props.logoContents || (<Link href="/" className={this.styles.headerLogo}> NextJSCommon </Link>),
    };
  }

  get styles() {
    return this.props.styles || {};
  }

  render() {
    return (
      <header className={this.styles.headerContainer}>
        {this.renderHomeButton()}
        {this.state.logoContents}
        {this.renderMenu()}
        {this.props.showSearchButton ? this.renderSearch() : null}
      </header>
    );
  }

  protected renderHomeButton() {
    const styles = this.styles;
    if (this.props.hideHomeButton) return null;
    return (
      <Link href="/" className={styles.homeButton}>
        <Image className={styles.homeButtonImage} width={40} height={40} alt="Home" src={HomeButton} />
      </Link>
    );
  }

  renderMenu() {
    const styles = this.props.styles;
    const items = this.renderMenuItems();
    if (items.length == 0) {
      return <></>;
    }
    return (
      <>
        <input ref={this.menuButtonRef} className={styles.menuButton} type="checkbox" id="menuButton" key="menuBtn" />
        <label className={styles.menuIconLabel} htmlFor="menuButton" key="menuIconLabel">
          <span className={styles.menuNavicon}></span>
        </label>
        <ul className={styles.menu} key="menuItemsList">
          {items}
        </ul>
      </>
    );
  }

  protected renderMenuItem(title: string, key: string, href: string | ((e: any) => boolean)) {
    return (
      <li key={key}>
        {
        typeof href === "string" ?
          <a href={href}>{title}</a>
        : (
            href ? <a style={{cursor: "pointer"}} onClick={(e) => {
                      if (href(e)) { this.closeMenu(); return true} else { return false; } }
                    }>{title}</a>
                 : <a>{title}</a>
          )
        }
      </li>
    );
  }

  protected renderMenuItems() {
    let out = [];
    for (const [title, key, href] of this.state.extraMenuItems || []) {
      out.push(this.renderMenuItem(title, key, href));
    }
    if (!this.props.hideDefaultMenuButtons) {
      out = out.concat(this.renderDefaultMenuItems());
    }
    return out;
  }

  protected renderDefaultMenuItems() {
    const out = [];
    out.push(this.renderMenuItem("Blog", "listItemBlog", "/blog"));
    if (this.props.auth?.isLoggedIn) {
      if (this.props.showLogoutButton) {
        out.push(this.renderMenuItem("Logout", "listItemLogout", "/auth/logout"));
      }
    } else {
      if (this.props.showLoginButton) {
        out.push(this.renderMenuItem("Login", "listItemLogin", "/login"));
      }
    }
    return out;
  }

  renderSearch() {
    const styles = this.props.styles;
    return (
      <>
        <input ref={this.searchButtonRef} className={styles.searchButton} type="checkbox" id="searchButton" />
        <label className={styles.searchIconLabel} htmlFor="searchButton">
          <Image width={30} height={30} className={styles.searchNavicon} src={SearchButton} alt="Search" />
        </label>
        <div className={styles.searchPanel}>
          <form ref={this.searchFormRef} className={styles.searchForm}
                onSubmit={(e) => {
                  e.preventDefault();
                  if (this.searchInputRef.current != null) {
                    const term = this.searchInputRef.current.value;
                    console.log("Form submitted: ", e, term);
                    if (this.props.searchSubmitted) {
                      this.props.searchSubmitted(term.trim());
                    }
                  }
                  return false;
                }}>
            <div className={styles.searchInputContainer}>
              <input type="text" ref = {this.searchInputRef} className={styles.searchInput} placeholder = "Search..." />
              <input type="submit"  ref={this.searchSubmitButtonRef} className={styles.submitSearchButton} value = "Search" />
            </div>
            <div className="searchPanelBottom">
            {this.props.searchResultsPanel || ""}
            </div>
          </form>
        </div>
      </>
    );
  }

  closeMenu() {
    if (this.menuButtonRef.current != null) {
      this.menuButtonRef.current.checked = false;
    }
  }

  closeSearch() {
    if (this.searchButtonRef.current != null) {
      this.searchButtonRef.current.checked = false;
    }
  }
}
