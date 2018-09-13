// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file ./pages/_document.js
import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage()
    const styles = flush()
    return { html, head, errorHtml, chunks, styles }
  }

  render() {
    return (
      <html>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no' />
          <meta http-equiv='Content-Security-Policy' content='upgrade-insecure-requests' />
          <link rel='shortcut icon' type='image/x-icon' href='/static/favicon.ico' />
          <link rel='stylesheet' href='/static/styles/app.css' />
          <link rel='stylesheet' href='/_next/static/style.css' />
          <script src='https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js' />
          <script src='https://api.map.baidu.com/api?v=2.0&ak=2g6Ot3jfb2OM20OVREbVdpmPE21Nmzon' />
          <script src='https://res.wx.qq.com/open/js/jweixin-1.2.0.js' />
          {/* <script src='/static/vconsole.min.js' /> */}
          <script src='/static/initial.js' />
        </Head>
        <body className='custom_class'>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
