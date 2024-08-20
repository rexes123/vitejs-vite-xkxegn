import Nav from "../components/Nav"

export default function Dashboard() {
    return (
        <div className="container" style={{ display: "flex"}}>
            <Nav />

            <div class="container text-center">
                <div class="row">
                    <div class="col-sm-5">col-sm-5</div>
                    <div class="col-sm-7">col-sm-7</div>
                </div>
                <div class="row">
                    <div class="col-sm">col-sm</div>
                    <div class="col-sm">col-sm</div>
                    <div class="col-sm">col-sm</div>
                    <div class="col-sm">col-sm</div>
                </div>
                <div class="row">
                    <div class="col-sm-6">col-sm-6</div>
                    <div class="col-sm-6">col-sm-6</div>
                </div>
            </div>
        </div>
    )
}