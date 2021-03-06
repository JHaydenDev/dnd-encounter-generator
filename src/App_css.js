import styled from 'styled-components'

export const Banner = styled.div`
	height: 60px;
	border-bottom: 2px solid #D1AE78;
	box-shadow: 1px 1px 5px 1px black;
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 1;
	display: flex;
	align-items: center;
	> h1 {
		color: white;
		margin-left: 20px;
		font-size: 2rem;
	}
`

export const GroupAndSearch = styled.div`
	display: flex;
	padding: 10px;
	justify-content: center;
	@media (max-width: 1375px){
		flex-direction: row;
		flex-wrap: wrap;
	}
`

export const Container = styled.div`
	width: 100%;
	min-height: 800px;
	background-color: rgb(39,45,57);
	@media (max-width: 740px){
		min-height: 1200px;
	}
	@media (max-width: 500px){
		min-height: 1000px;
	}
`