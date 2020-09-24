import Link from 'next-translate/Link'
import withTranslation from 'next-translate/withTranslation'
import Router from 'next-translate/Router'
import { withRouter } from 'next/router'
import Container from '../Container'
import Icon from '../Icon'
import Button from '../Button'
import SubscribeFormModal from '../Contact/SubscribeFormModal'
import { ReactComponent as HeaderLogo } from './HeaderLogo.svg'
import { ReactComponent as Logo } from '../Footer/HSlogo.svg'

class Header extends React.Component {
  dropdown = false
  state = {
    language: null
  }

  onToggleMenu = () => {
    if (this.state.language) {
      this.setState({ language: null })
      return
    }

    const close = this.menuClose
    const toggle = this.menuToggle
    const dropdownNav = this.dropdownNav

    if (this.dropdown) {
      dropdownNav.style.display = 'none'
      close.style.display = 'none'
      toggle.style.display = 'block'
    } else {
      dropdownNav.style.display = 'flex'
      close.style.display = 'block'
      toggle.style.display = 'none'
    }

    this.dropdown = !this.dropdown
  }

  onClickSubscribe = () => {
    const { showModal } = this.props
    showModal(<SubscribeFormModal formId="2166978" formCode="d8h6h7" onClose={() => showModal(null)} />)
  }

  onChangeLng = lang => {
    const { router } = this.props
    const { query } = router

    if (query.lang === lang) {
      return
    }

    router.push(`/${lang}`)
    // if (!query.slug || !query.lang) {
    //   // Router.pushI18n({ url: '/', options: { lang } })
    //   return
    // }
    //
    // const newRoute = router.asPath
    //   .replace(RegExp(`^\/${query.lang}`), '')
    //   .replace(RegExp(`\/${query.lang}\/`), `/${lang}/`)
    //
    // Router.pushI18n({ url: newRoute, options: { lang } })
  }

  showLanguages = () => {
    const { style } = this.dropdownNav
    if (style.display === 'none') {
      return
    }

    this.setState({ language: !this.state.language })
  }

  render() {
    const { language } = this.state

    return (
      <header className="Header">
        <Container clipped={false}>
          <div className="navbar">
            <Link href="/[lang]" as="/">
              <a><HeaderLogo className="Header-logo" /></a>
            </Link>

            {this.navigationMenu(this.props)}

            <div className="Menu-wrap" onClick={this.onToggleMenu}>
              <div className="Menu-close" ref={r => this.menuClose = r}>
                <Icon name="menu-close" />
              </div>
              <div className="Menu-toggle" ref={r => this.menuToggle = r}>
                <Icon name="menu" />
              </div>
            </div>
          </div>
        </Container>
        <div className="navbar-dropdown" ref={r => this.dropdownNav = r} style={{ display: 'none' }}>
          {language ? this.languageMenu() : this.navigationMenu(this.props)}
          <div className="nav-logo">
            <Logo className="Logo" />
          </div>
        </div>
      </header>
    )
  }

  navigationMenu = ({ darkMode, i18n }) => (
    <div className="nav">
      <a href="https://horizontalsystems.io">
        <div className="Button-nav nav-item">{i18n.t('common:about')}</div>
      </a>
      <a href="https://t.me/unstoppable_development">
        <div className="Button-nav nav-item">{i18n.t('common:contact')}</div>
      </a>
      <div className="nav-icon nav-language" onClick={this.showLanguages}>
        <Icon name="globe" />
        <div className="dropdown-menu dropdown-menu-center">
          <div className="dropdown-item" onClick={() => this.onChangeLng('en')}>English</div>
          <div className="dropdown-item" onClick={() => this.onChangeLng('ru')}>Russian</div>
          <div className="dropdown-item" onClick={() => this.onChangeLng('fr')}>French</div>
          <div className="dropdown-item" onClick={() => this.onChangeLng('de')}>Dutch</div>
          <div className="dropdown-item" onClick={() => this.onChangeLng('fa')}>Farsi</div>
        </div>
      </div>
      <div className="nav-icon" onClick={darkMode.toggle}>
        <Icon name="dark-light" />
      </div>
      <Button
        className="Button-yellow nav-item-subscribe" title={i18n.t('common:subscribe')}
        onClick={this.onClickSubscribe}
      />
    </div>
  )

  languageMenu = () => (
    <div className="nav">
      <div className="Button-nav nav-item" onClick={() => this.onChangeLng('en')}>English</div>
      <div className="Button-nav nav-item" onClick={() => this.onChangeLng('ru')}>Russian</div>
      <div className="Button-nav nav-item" onClick={() => this.onChangeLng('fr')}>French</div>
      <div className="Button-nav nav-item" onClick={() => this.onChangeLng('de')}>Dutch</div>
      <div className="Button-nav nav-item" onClick={() => this.onChangeLng('fa')}>Farsi</div>
    </div>
  )
}

export default withTranslation(withRouter(Header))
