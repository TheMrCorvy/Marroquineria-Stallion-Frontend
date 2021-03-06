import { FC } from "react"

import { Paper, Grid, ButtonBase, Typography, Button, Fab, Tooltip } from "@material-ui/core"

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
import { green, red } from "@material-ui/core/colors"

import PlusOneIcon from "@material-ui/icons/PlusOne"
import ExposureNeg1Icon from "@material-ui/icons/ExposureNeg1"

import Image from "next/image"

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../redux/store"
import { addOrRemoveUnits, removeItemFromCart } from "../redux/actions/cartActions"
import { ProductCardProps } from "../misc/types"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		paper: {
			padding: theme.spacing(2),
			margin: "auto",
			maxWidth: "90%",
			borderRadius: 10,
		},
		image: {
			maxWidth: 150,
			maxHeight: 150,

			[theme.breakpoints.down("sm")]: {
				maxWidth: "100%",
				maxHeight: "100%",
			},
		},
		img: {
			margin: "auto",
			display: "block",
			maxWidth: "100%",
			maxHeight: "100%",
			borderRadius: 7,
		},
		productName: {
			textTransform: "capitalize",
		},
		textCenter: {
			textAlign: "center",
		},
		marginTop: {
			marginTop: "1rem",
			[theme.breakpoints.down("sm")]: {
				marginTop: 0,
			},
		},
		textGreen: {
			color: green[500],
		},
		redBtn: {
			color: red[500],
			borderColor: red[500],
			"&:hover": {
				backgroundColor: red[100],
			},
		},
		noShadow: {
			boxShadow: "none",
		},
	})
)

const CartListItems: FC = () => {
	const { cart } = useSelector((state: RootState) => state.cart)

	const dispatch = useDispatch()

	const classes = useStyles()

	const formatter = new Intl.NumberFormat("es-AR", {
		style: "currency",
		currency: "ARS",
	})

	const cartIsEmpty = () => {
		return (
			<Typography variant="h5" paragraph gutterBottom>
				Tu carrito de compras está vacío...
			</Typography>
		)
	}

	const addOrSubstract = (action: "+1" | "-1", index: number) => {
		const productToModify = cart.products[index].product

		dispatch(addOrRemoveUnits(productToModify, action))
	}

	const removeItem = (productId: number) => {
		dispatch(removeItemFromCart(productId))
	}

	const showPrice = (product: ProductCardProps) => {
		if (product.discount) {
			const priceToSubstract = (product.discount * product.price) / 100
			return (
				<Typography variant="subtitle1" className={classes.textGreen}>
					{formatter.format(product.price - priceToSubstract)}
				</Typography>
			)
		} else {
			return (
				<Typography variant="subtitle1" className={classes.textGreen}>
					{formatter.format(product.price)}
				</Typography>
			)
		}
	}

	return (
		<Grid container justify="center" spacing={4}>
			{cart.products.length === 0
				? cartIsEmpty()
				: cart.products.map((product, index) => (
						<Grid item xs={12} key={index}>
							<Paper className={classes.paper}>
								<Grid container spacing={2}>
									<Grid item>
										<Grid container justify="space-between">
											<Grid item xs={12}>
												{showPrice(product.product)}
											</Grid>
										</Grid>
										<Grid item xs={12} className={classes.marginTop}>
											<ButtonBase className={classes.image}>
												<Image
													className={classes.img}
													alt="complex"
													height={150}
													width={150}
													src={product.product.images[0].img_url}
												/>
											</ButtonBase>
										</Grid>
									</Grid>
									<Grid item xs={12} sm container>
										<Grid item xs container spacing={2}>
											<Grid item xs={12}>
												<Typography
													gutterBottom
													variant="subtitle1"
													className={classes.productName}
												>
													{product.product.title}
												</Typography>
												<Typography variant="body2" gutterBottom paragraph>
													{product.product.description}
												</Typography>
												<Typography variant="body2" color="textSecondary">
													Cantidad:{" "}
													<Typography component="span" color="primary">
														{product.units}
													</Typography>
												</Typography>
											</Grid>
											<Grid
												item
												xs={12}
												md={4}
												className={classes.textCenter}
											>
												<Tooltip title="Remover uno" placement="right">
													<Fab
														className={classes.noShadow}
														size="small"
														color="primary"
														aria-label="remover uno"
														onClick={() => addOrSubstract("-1", index)}
													>
														<ExposureNeg1Icon />
													</Fab>
												</Tooltip>
											</Grid>
											<Grid
												item
												xs={12}
												md={4}
												className={classes.textCenter}
											>
												<Tooltip title="Agregar uno más" placement="left">
													<Fab
														className={classes.noShadow}
														size="small"
														color="secondary"
														aria-label="agregar uno mas"
														onClick={() => addOrSubstract("+1", index)}
													>
														<PlusOneIcon />
													</Fab>
												</Tooltip>
											</Grid>

											<Grid
												item
												xs={12}
												md={4}
												className={classes.textCenter}
											>
												<Button
													variant="contained"
													disableElevation
													color="secondary"
													onClick={() => removeItem(product.product.id)}
												>
													Quitar Producto
												</Button>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</Paper>
						</Grid>
				  ))}
		</Grid>
	)
}

export default CartListItems
