import React from "react"
import Document, { Html, Head, Main, NextScript } from "next/document"

import { ServerStyleSheets } from "@material-ui/core/styles"

class MyDocument extends Document {
	render() {
		return (
			<Html lang="es">
				<Head>
					{/**material UI */}
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/icon?family=Material+Icons"
					/>
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
					/>
					<meta charSet="utf-8" />
					<meta httpEquiv="X-UA-Compatible" content="IE=edge" />

					<meta
						name="description"
						content="Visita la Tienda Online de Stallion Marroquinería"
					/>
					<meta name="keywords" content="Marroquineria Stallion" />

					{/* Google Fonts */}
					<link rel="preconnect" href="https://fonts.googleapis.com"></link>
					<link rel="preconnect" href="https://fonts.gstatic.com"></link>
					<link
						href="https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap"
						rel="stylesheet"
					></link>

					{/* react-slick styles */}
					<link
						rel="stylesheet"
						type="text/css"
						href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
					/>
					<link
						rel="stylesheet"
						type="text/css"
						href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
					{/**MercadoPago */}
					<script
						async
						src="https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js"
					></script>
				</body>
			</Html>
		)
	}
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
	// Resolution order
	//
	// On the server:
	// 1. app.getInitialProps
	// 2. page.getInitialProps
	// 3. document.getInitialProps
	// 4. app.render
	// 5. page.render
	// 6. document.render
	//
	// On the server with error:
	// 1. document.getInitialProps
	// 2. app.render
	// 3. page.render
	// 4. document.render
	//
	// On the client
	// 1. app.getInitialProps
	// 2. page.getInitialProps
	// 3. app.render
	// 4. page.render

	// Render app and page and get the context of the page with collected side effects.
	const sheets = new ServerStyleSheets()
	const originalRenderPage = ctx.renderPage

	ctx.renderPage = () =>
		originalRenderPage({
			enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
		})

	const initialProps = await Document.getInitialProps(ctx)

	return {
		...initialProps,
		// Styles fragment is rendered after the app and page rendering finish.
		styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
	}
}

export default MyDocument
