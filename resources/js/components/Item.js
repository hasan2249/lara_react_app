export default function Item() {
    const getDate = () => {
        fetchData(`/api/data`)
            .then((list) => {
                let data = list.ds;
                console.log("History", data);
                this.setState({
                    val: data,
                });
            })
            .catch((e) => console.log(e));
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card m-3">
                        <div className="card-header text-xxl-center ">
                            <h1>Item</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
