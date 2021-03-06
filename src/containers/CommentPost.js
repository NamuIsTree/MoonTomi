import React from 'react';
import axios from 'axios';

//material-ui
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Rating from '@material-ui/lab/Rating';

const styles = {
    content: {
        width: '100%',
        height: '200%',
        textAlign: 'center',
        marginBottom: '2rem'
    },
    button: {
        width: '100%',
        textAlign: 'center'

    }
};

class CommentPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            showPassword: false,
            albums: [],
            password: '',
            nickname: '',
            album_id: '',
            star: 0,
            best1: 0,
            best2: 0,
            best3: 0,
            comment: ''
        };

        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
    }

    componentDidMount() {
        this.getAlbums();
    }

    getAlbums = async () => {
        var url = "http://moonmusic.duckdns.org:8081/api/albums/all";
        var album = await axios.get(url);
        this.setState({albums: album.data.reverse()});
    }

    addComment = async () => {
        const {nickname, password, album_id, star, best1, best2, best3, comment} = this.state;
        const url = 'http://moonmusic.duckdns.org:8081/api/postComment';
        const obj = {
            nickname: nickname,
            password: password,
            album_id: album_id,
            star: star,
            best1: best1,
            best2: best2,
            best3: best3,
            comment: comment
        };
        console.log(obj);
        const response = await axios.post(url, obj);
    }

    handleClickShowPassword() {
        this.setState({showPassword: !this.state.showPassword});
    }

    handleMouseDownPassword(event) {
        event.preventDefault();
    }

    handleValueChange(event) {
        let nextState = {};
        nextState[event.target.name] = event.target.value;
        this.setState(nextState);
    }

    handleFormSubmit(event) {
        event.preventDefault();
        this.addComment()
        .then((response) => {
            console.log(response);
        })

        this.setState({
            activeStep: this.state.activeStep + 1
        });
    }

    handleNext = () => {
        this.setState({
            activeStep: this.state.activeStep + 1
        });
    }

    handleBack = () => {
        this.setState({
            activeStep: this.state.activeStep - 1
        });
    }

    render() {
        const { classes } = this.props;
        const steps = ['Setting', 'Write', 'Post'];
        const getStepContent = stepNumber => {
            switch (stepNumber) {
                case 0:
                    return (
                        <div className="step-one">
                            평가에 사용할 닉네임과 비밀번호를 설정해주세요. <br/>
                            비밀번호는 나중에 평가를 수정하고자 할 때 사용됩니다. <br/> <br/>
                            <TextField 
                                type="text" 
                                id="standard-basic" 
                                label="닉네임" 
                                name="nickname" 
                                value={this.state.nickname}
                                onChange={this.handleValueChange}
                            /> <br/> <br/>
                            <TextField 
                                type="password"
                                id="standard-basic" 
                                label="비밀번호" 
                                name="password"
                                value={this.state.password}
                                onChange={this.handleValueChange}
                            /> <br/> <br/>
                        </div>
                    );
                case 1:
                    return (
                        <div className="step-two">
                            1. 평가하고자 하는 앨범을 선택해 주세요. <br/><br/>
                            <Autocomplete
                                id="combo-box-albums"
                                options={this.state.albums}
                                getOptionLabel={(option) => option.name}
                                defaultValue={this.state.albums[this.state.albums.length - this.state.album_id]}
                                onChange={(event, newValue) => {
                                    this.setState({album_id: newValue.id});
                                }}
                                renderInput={(params) => <TextField {...params} style={{textAlign: 'center'}} value={params.id} label="앨범 선택" variant="outlined" />}
                            /> <br/> <br/>
                            
                            2. 앨범 평점을 선택해 주세요. <br/><br/>
                            <Rating
                                name="star-rating"
                                value={this.state.star / 2}
                                precision={0.5}
                                onChange={(event, newValue) => {
                                    this.setState({star: newValue * 2})
                                }}
                            /> <br/> <br/>

                            3. 앨범 한줄평을 적어주세요. <br/><br/>
                            <TextField
                                type="text"
                                id="standard-multiline-static"
                                label="앨범 한줄평"
                                value={this.state.comment}
                                name="comment"
                                multiline
                                rows={4}
                                fullWidth
                                variant="outlined"
                                onChange={this.handleValueChange}
                            />
                        </div>
                    );
                case 2:
                    return '현재 작성한 내용을 포스트하시겠어요?';
                default:
                    return '어라? 여긴 어떻게 오셨어요? 새로고침을 해주세요!';
            }
        }

        return (
            <div className="comment-post-container">
                <Stepper 
                    className={classes.stepper} 
                    activeStep={this.state.activeStep}
                    alternativeLabel
                >
                    {steps.map(label => (
                        <Step key={label}>
                            <StepLabel>
                                {label}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    {this.state.activeStep === steps.length ? (
                        <div>
                            <div className={classes.content}>
                                평가가 포스트되었습니다. 감사합니다.
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className={classes.content}>
                                {getStepContent(this.state.activeStep)}
                            </div>
                            <div className={classes.button}>
                                <Button
                                    style={{marginRight:'10px'}}
                                    variant="contained"
                                    color="primary"
                                    disabled = {this.state.activeStep === 0}
                                    onClick={this.handleBack}
                                >
                                    Back
                                </Button>
                                <Button
                                    variant="contained"
                                    color={this.state.activeStep !== steps.length - 1 ? 
                                        "primary" : "secondary"}
                                    onClick={this.state.activeStep !== steps.length - 1 ?
                                        this.handleNext : this.handleFormSubmit}
                                >
                                    {this.state.activeStep === steps.length - 1 ? 
                                        'Post' : 'Next'
                                    }
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(CommentPost);