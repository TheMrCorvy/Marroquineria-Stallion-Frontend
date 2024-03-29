import { FC, useEffect, useState } from "react"

import { useRouter } from "next/router"

import {
	Button,
	Typography,
	Card,
	CardContent,
	Grid,
	Tooltip,
	Divider,
	ButtonBase,
	TextField,
	IconButton,
	Snackbar,
} from "@material-ui/core"

import { makeStyles } from "@material-ui/core/styles"
import { green } from "@material-ui/core/colors"

import CancelPresentationIcon from "@material-ui/icons/CancelPresentation"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import PlusOneIcon from "@material-ui/icons/PlusOne"
import ExposureNeg1Icon from "@material-ui/icons/ExposureNeg1"
import ShareIcon from "@material-ui/icons/Share"

import ShopTwoIcon from "@material-ui/icons/ShopTwo"

import Image from "next/image"

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../redux/store"
import { clearProduct } from "../redux/actions/productActions"
import { addToCart } from "../redux/actions/cartActions"
import DialogTransition from "./DialogTransition"
import { ProductCardProps } from "../misc/types"

const useStyles = makeStyles({
	container: {
		paddingTop: 30,
	},
	card: {
		borderRadius: 20,
	},
	title: {
		textTransform: "capitalize",
	},
	textCenter: {
		textAlign: "center",
	},
	backBtn: {
		boxShadow: "none",
		color: "white",
		borderColor: "white",
		borderRadius: 7,
	},
	img: {
		margin: "auto",
		display: "block",
		maxWidth: "100%",
		maxHeight: "100%",
		borderRadius: 7,
	},
	media: {
		borderRadius: 20,
	},
	images: {
		marginBottom: "3rem",
	},
	mainImg: {
		borderRadius: 25,
		marginTop: 10,
	},
	mainImageContainer: {
		paddingTop: 15,
		textAlign: "center",
		color: green[500],
	},
	buyBtn: {
		borderRadius: 8,
	},
	unities: {
		color: green[500],
		textAlign: "center",
		fontWeight: "bold",
		fontSize: "1.5rem",
	},
	shareBtn: {
		marginBottom: "2rem",
	},
	brand: {
		textTransform: "capitalize",
	},
})

const ShowProduct: FC = () => {
	const router = useRouter()

	const { product } = useSelector((state: RootState) => state.product)

	const dispatch = useDispatch()

	const [units, setUnits] = useState<number>(1)

	const [activeImg, setActiveImg] = useState<string>("")

	const [copied, setCopied] = useState(false)

	const classes = useStyles()

	useEffect(() => {
		if (product) {
			setActiveImg(product.images[0].img_url)
		}

		if (copied) {
			const timer = setTimeout(() => {
				setCopied(false)
			}, 20000)
			return () => {
				clearTimeout(timer)
			}
		}
	}, [product, copied])

	const removeProduct = () => {
		dispatch(clearProduct())
	}

	const modifyUnits = (action: "+1" | "-1") => {
		if (action === "+1") {
			setUnits(units + 1)
		} else {
			setUnits(units - 1)
		}
	}

	const dispatchAddToCart = () => {
		if (product && units <= product.stock && units > 0) {
			dispatch(addToCart(product, units))
		}
	}

	const updateActiveImg = (index: number) => {
		if (product) {
			setActiveImg(product.images[index].img_url)
		}
	}

	const buyNow = () => {
		if (product && units <= product.stock && units > 0) {
			dispatch(addToCart(product, units))

			router.push("/checkout")
		}
	}

	const copyToClipboard = () => {
		navigator.clipboard.writeText(`https://stallionmarroquineria.com/producto/${product?.id}`)

		setCopied(true)
	}

	const hideSnackbar = () => {
		setCopied(false)
	}

	const formatter = new Intl.NumberFormat("es-AR", {
		style: "currency",
		currency: "ARS",
	})

	const title = () => {
		if (product?.stock === 0) {
			return "SIN STOCK - " + product?.title
		} else {
			return product?.title
		}
	}

	const showPrice = (product: ProductCardProps) => {
		if (product.discount) {
			const priceToSubstract = (product.discount * product.price) / 100

			return (
				<>
					<Typography
						variant="h5"
						style={{ paddingTop: 10, textDecoration: "line-through" }}
						color="secondary"
					>
						{formatter.format(product.price)}
					</Typography>
					<Typography variant="h5" style={{ paddingTop: 10 }}>
						¡¡ {formatter.format(product.price - priceToSubstract)} !!
					</Typography>
				</>
			)
		} else {
			return (
				<>
					<Typography variant="h5" style={{ paddingTop: 10 }}>
						{formatter.format(product.price)}
					</Typography>
				</>
			)
		}
	}

	if (!product) {
		return null
	} else {
		return (
			<>
				<Grid container justify="space-around" spacing={4}>
					<Grid item xs={12} sm={12} md={4} className={classes.textCenter}>
						<Typography color="inherit" style={{ color: "white" }} variant="body1">
							Productos{" "}
							<Typography
								component="span"
								color="textPrimary"
								className={classes.title}
							>
								/ {title()}
							</Typography>
						</Typography>
					</Grid>
					<Grid item xs={12} sm={12} md={4} className={classes.textCenter}>
						<Typography variant="h6" className={classes.title}>
							{title()}
						</Typography>
						<Divider />
					</Grid>
					<Grid item xs={12} sm={12} md={4} className={classes.textCenter}>
						<Tooltip title="Volver" placement="right">
							<Button
								disableElevation
								variant="outlined"
								color="secondary"
								startIcon={<CancelPresentationIcon />}
								className={classes.backBtn}
								onClick={removeProduct}
							>
								Volver
							</Button>
						</Tooltip>
					</Grid>

					<Grid item xs={12} sm={11}>
						<Card className={classes.card}>
							<CardContent>
								<Grid container justify="space-around">
									<Grid item xs={12} md={4}>
										<Grid
											container
											direction="column"
											justify="space-between"
											spacing={0}
										>
											<Grid item xs={12}>
												<Typography
													variant="h5"
													className={classes.title}
													paragraph
												>
													{title()}
												</Typography>
											</Grid>
											<Grid item xs={12}>
												<Typography variant="body2" paragraph gutterBottom>
													{product.description}
												</Typography>
												<Typography
													variant="subtitle2"
													color="secondary"
													paragraph
													gutterBottom
													className={classes.brand}
												>
													Marca: {product.brand}
												</Typography>
												<Typography
													variant="subtitle2"
													color="primary"
													paragraph
													gutterBottom
													className={classes.brand}
												>
													Categoría: {product.type}
												</Typography>
											</Grid>
											<Grid item xs={12} className={classes.textCenter}>
												<Tooltip title="Compartir" placement="right">
													<IconButton
														color="secondary"
														size="medium"
														className={classes.shareBtn}
														onClick={copyToClipboard}
													>
														<ShareIcon />
													</IconButton>
												</Tooltip>
											</Grid>
											<Grid item xs={12}>
												<Grid
													container
													justify="space-around"
													spacing={4}
													className={classes.images}
												>
													{product.images.map((image, index) => (
														<Grid item xs={6} md={4} key={index}>
															<ButtonBase
																onClick={() =>
																	updateActiveImg(index)
																}
															>
																<Image
																	src={image.img_url}
																	title={title()}
																	alt={title()}
																	width={150}
																	height={150}
																	className={classes.img}
																/>
															</ButtonBase>
														</Grid>
													))}
												</Grid>
											</Grid>
										</Grid>
									</Grid>

									<Grid
										item
										xs={12}
										md={4}
										className={classes.mainImageContainer}
									>
										{activeImg && (
											<Image
												src={activeImg}
												title={title()}
												alt={title()}
												width="auto"
												height="auto"
												layout="responsive"
												className={classes.mainImg}
											/>
										)}
										{showPrice(product)}
									</Grid>

									<Grid item xs={12} md={3}>
										<Grid
											container
											justify="space-around"
											style={{ height: "100%" }}
											spacing={4}
										>
											<Grid item xs={12} className={classes.textCenter}>
												<Typography
													variant="subtitle1"
													color="primary"
													paragraph
												>
													Unidades en Stock: {product.stock}
												</Typography>
												{product.discount !== null &&
													product.discount !== 0 && (
														<Typography
															variant="h6"
															color="secondary"
															paragraph
														>
															Descuento Limitado: {product.discount}%
														</Typography>
													)}
											</Grid>
											<Grid item xs={12} className={classes.textCenter}>
												<TextField
													id="filled-basic"
													value={units}
													onChange={() => {}}
													variant="filled"
													disabled
													error={units < 1 || units > product.stock}
													helperText="Las unidades no pueden ser mayores al stock, o menores a 1"
													InputProps={{
														startAdornment: (
															<IconButton
																color="secondary"
																onClick={() => modifyUnits("+1")}
															>
																<PlusOneIcon />
															</IconButton>
														),
														endAdornment: (
															<IconButton
																color="primary"
																onClick={() => modifyUnits("-1")}
															>
																<ExposureNeg1Icon />
															</IconButton>
														),
														classes: {
															input: classes.unities,
														},
													}}
												/>
											</Grid>
											<Grid item xs={12}>
												<Button
													className={classes.buyBtn}
													size="large"
													variant="contained"
													color="secondary"
													startIcon={<ShoppingCartIcon />}
													endIcon={<ShoppingCartIcon />}
													disableElevation
													fullWidth
													onClick={dispatchAddToCart}
													disabled={!product.stock}
												>
													Agregar al carrito
												</Button>
											</Grid>
											<Grid item xs={12}>
												<Button
													className={classes.buyBtn}
													size="large"
													variant="contained"
													color="secondary"
													disableElevation
													startIcon={<ShopTwoIcon />}
													endIcon={<ShopTwoIcon />}
													fullWidth
													onClick={buyNow}
													disabled={!product.stock}
												>
													Comprar ahora
												</Button>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
				{copied && (
					<Snackbar
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "left",
						}}
						open={copied}
						autoHideDuration={20000}
						message="Enlace copiado, puedes pegarlo y compartirlo en cualquier red social."
						onClose={hideSnackbar}
						TransitionComponent={DialogTransition}
					/>
				)}
			</>
		)
	}
}

export default ShowProduct
