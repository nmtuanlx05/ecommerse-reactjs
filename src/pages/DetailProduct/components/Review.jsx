import Button from '@components/Button/Button';
import FormItem from '@/pages/DetailProduct/components/FormItem';
import styles from '../styles.module.scss';

function ReviewProduct() {
    const {
        containerReview,
        reviews,
        noreview,
        replyForm,
        cmtReplyTitle,
        cmtNotes,
        boxCheck,
        btnSubmit
    } = styles;
    return (
        <div className={containerReview}>
            <div className={reviews}>REVIEWS</div>

            <p className={noreview}>There are no reviews yet.</p>

            <div className={replyForm}>
                <div className={cmtReplyTitle}>
                    BE THE FIRST TO REVIEW "10K YELLOW GOLD"
                </div>

                <p className={cmtNotes}>
                    Your email address will not be published. Required fields
                    are marked
                </p>

                <form action=''>
                    {/* Rating */}
                    <FormItem
                        label={'Your rating'}
                        isRequired={true}
                        typeChildren='rating'
                    />

                    {/* Textarea */}
                    <FormItem
                        label={'Your review'}
                        isRequired={true}
                        typeChildren='textarea'
                    />

                    {/* Name */}

                    <FormItem
                        label={'Name'}
                        isRequired={true}
                        typeChildren='input'
                    />

                    <FormItem
                        label={'Email'}
                        isRequired={true}
                        typeChildren='input'
                    />

                    <div className={boxCheck}>
                        <input type='checkbox' name='' id='' />
                        <span>
                            Save my name, email, and website in this browser for
                            the next time I comment.
                        </span>
                    </div>
                    <div className={btnSubmit}>
                        <Button content={'SUBMIT'} />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ReviewProduct;
