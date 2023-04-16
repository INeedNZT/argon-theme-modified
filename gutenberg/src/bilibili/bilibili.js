/**
 * B站嵌入视频的自适应标签，根据配置自动生成bilibili iframe
 * 建这个组件主要是为了跳过oEmbed的机制，鉴于国内视频网站大多都不支持oEmbed
 * 简化并复刻了的官方Github上的Embed组件代码，加上了验证转化url以及检查B站视频可用性等功能
 * 另外添加了block转化功能，如果输入oEmbed支持的url（Youtube, twitter, tiktok...）可点击转化按钮转化成Embed
 */
import './editor.scss';
import { __ } from './../i18n/i18n.js';
import { sprintf } from '@wordpress/i18n';
import { useState, useEffect, useLayoutEffect, useMemo, renderToString } from '@wordpress/element';
import { registerBlockType, createBlock, getDefaultBlockName } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import { useBlockProps, BlockControls, InspectorControls, RichText } from '@wordpress/block-editor';
import {
	Spinner, Placeholder, Button, ExternalLink,
	ToolbarGroup, ToolbarButton, PanelBody, ToggleControl, SandBox
} from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';


const ASPECT_RATIOS = [
	// Common video resolutions.
	{ ratio: '2.33', className: 'wp-embed-aspect-21-9' },
	{ ratio: '2.00', className: 'wp-embed-aspect-18-9' },
	{ ratio: '1.78', className: 'wp-embed-aspect-16-9' },
	{ ratio: '1.33', className: 'wp-embed-aspect-4-3' },
	// Vertical video and instagram square video support.
	{ ratio: '1.00', className: 'wp-embed-aspect-1-1' },
	{ ratio: '0.56', className: 'wp-embed-aspect-9-16' },
	{ ratio: '0.50', className: 'wp-embed-aspect-1-2' },
];

const blockName = 'argon/bilibili';
const label = 'BilibiliURL';
const bilibiliIcon = (<svg viewBox="0 0 2299 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
	<path d="M1775.840814 322.588002c6.0164 1.002733 53.144869-9.525967 55.150336-6.016401 3.0082 4.5123 24.065601 155.92504 18.550567 156.927774s-44.621635 10.027334-44.621635 10.027334c-3.0082-20.556034-28.577901-147.903173-29.079268-160.938707m75.205003-14.539634l20.556034 162.944174c10.5287-0.501367 53.144869-3.509567 57.155803-4.010934-6.0164-61.668103-16.545101-158.933241-16.545101-158.93324-20.054668-4.010934-41.112069-4.010934-61.166736 0m-40.610702 226.116376s92.752838-23.564234 126.344406-12.0328c17.046467 61.668103 48.131202 407.611118 51.139402 421.649386-21.057401 2.506833-90.246004 8.523234-95.761037 10.027333-4.5123-26.071068-81.72277-403.098818-81.722771-419.643919m343.436183-207.565809c5.515034 1.5041 54.648969-5.013667 55.150335-1.5041 1.002733 12.032801 6.0164 157.42914 0.501367 157.930507s-44.621635 4.010934-44.621635 4.010934c-1.002733-20.054668-12.032801-146.90044-11.030067-160.437341m75.70637-4.010933l4.010933 160.938707c10.5287 0 52.643502 2.506833 57.155803 2.005467-1.002733-61.668103 0-158.933241 0-158.933241-20.054668-3.509567-40.610702-5.013667-61.166736-4.010933m-64.676303 216.089043s94.758304-12.534167 126.845772 2.506833c7.019134 72.196803 6.0164 408.613852 7.019134 422.652119-21.558768 0-90.246004 1.002733-95.761038 2.005467-1.002733-26.071068-39.607968-410.619319-38.103868-427.164419m-220.099977-413.627519c54.648969 278.759879 96.262404 755.058234 97.766504 785.641602 0 0 43.117535 1.002733 91.750105 4.010934C2105.740095 614.383415 2070.644427 134.575493 2071.145794 119.033126c-12.032801-13.536901-126.344406 6.0164-126.344406 6.0164m-120.328005 659.297196c-10.5287-78.213204-290.291313-166.955108-447.720454-138.377206 0 0-19.553301-172.470141-27.073801-339.425248-6.517767-143.390873-1.002733-282.770813 0.501366-305.833681-10.5287-7.5205-123.837572 46.627102-185.004308 69.188603 0 0 73.199537 309.844614 126.344406 952.59671 0 0 84.730971 9.0246 230.12731-19.051934s317.365114-115.815705 302.825481-219.097244m-341.932083 140.88404l-24.566967-176.982441c6.0164-3.0082 156.927774 53.144869 172.971507 63.172203-2.506833 11.030067-148.40454 113.810238-148.40454 113.810238M610.664628 322.588002c6.0164 1.002733 53.144869-9.525967 55.150335-6.016401 3.0082 4.5123 24.065601 155.92504 18.550568 156.927774s-44.621635 10.027334-44.621635 10.027334c-3.0082-20.556034-28.577901-147.903173-29.079268-160.938707m75.205003-14.539634l20.556034 162.944174c10.5287-0.501367 53.144869-3.509567 57.155803-4.010934-6.517767-61.668103-16.545101-158.933241-16.545101-158.93324-20.054668-4.010934-41.112069-4.010934-61.166736 0m-40.610702 226.116376s92.752838-23.564234 126.344406-12.0328c17.046467 61.668103 48.131202 407.611118 51.139402 421.649386-21.057401 2.506833-90.246004 8.523234-95.761037 10.027333-4.5123-26.071068-81.72277-403.098818-81.722771-419.643919m343.436182-207.565809c5.515034 1.5041 54.648969-5.013667 55.150336-1.5041 1.002733 12.032801 6.0164 157.42914 0.501367 157.930507s-44.621635 4.010934-44.621635 4.010934c-1.002733-20.054668-11.531434-146.90044-11.030068-160.437341m75.706371-4.010933l4.010933 160.938707c10.5287 0 52.643502 2.506833 57.155803 2.005467-1.002733-61.668103 0-158.933241 0-158.933241-20.054668-3.509567-40.610702-4.5123-61.166736-4.010933m-64.676303 216.089043s94.758304-12.534167 126.845772 2.506833c7.019134 72.196803 6.0164 408.613852 7.019134 422.652119-21.558768 0-90.246004 1.002733-95.761038 2.005467-0.501367-26.071068-39.607968-410.619319-38.103868-427.164419m-220.099977-413.627519c54.648969 278.759879 96.262404 755.058234 97.766504 785.641602 0 0 43.117535 1.002733 91.750105 4.010934-28.577901-300.318647-63.67357-780.126569-63.172203-796.170303-12.032801-13.035534-126.344406 6.517767-126.344406 6.517767m-120.328005 659.297196c-10.5287-78.213204-290.291313-166.955108-447.720454-138.377206 0 0-19.553301-172.470141-27.073801-339.425248-6.517767-143.390873-1.002733-282.770813 0.501366-305.833681C174.475608-6.308547 61.166736 47.337689 0 69.89919c0 0 73.199537 309.844614 126.344406 952.59671 0 0 84.730971 9.0246 230.12731-19.051934s317.365114-115.815705 302.825481-219.097244m-341.932083 140.88404l-24.566967-176.982441c6.0164-3.0082 156.927774 53.144869 172.971507 63.172203-2.506833 11.030067-148.40454 113.810238-148.40454 113.810238" fill="#1296db" />
</svg>);
const pencilIcon = (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
	<path d="M20.1 5.1L16.9 2 6.2 12.7l-1.3 4.4 4.5-1.3L20.1 5.1zM4 20.8h8v-1.5H4v1.5z" />
</svg>)
const urlRegex = /^https?:\/\/(m\.|www\.)?bilibili\.(com|tv)\/(video\/(BV[0-9A-Za-z]+)\/?)*(\?[^"\s]+)*/i;
const captionClassNames = 'rich-text wp-element-caption';

const parseBilibiliURL = (url) => {
	// group 3 - 视频id
	const bvidGroup = 4;
	// group 4 请求参数
	const querysGroup = 5;
	if (urlRegex.test(url)) {
		const matchedStr = url.match(urlRegex);
		const querys = matchedStr[querysGroup];
		const pageRegex = /(\?|&)p=([\d]+)/i;
		// group 2 - 第几段视频（p1, p2, p3 ...）
		const pageGroup = 2;
		const page = pageRegex.test(querys) ? querys.match(pageRegex)[pageGroup] : '1';

		return {
			bvid: matchedStr[bvidGroup],
			page: page
		};
	}
	return null;
}

const getAspectRatioClassName = (width, height) => {
	if (!width || !height) {
		return;
	}
	const aspectRatio = (width / height).toFixed(2);
	// Given the actual aspect ratio, find the widest ratio to support it.
	for (
		let ratioIndex = 0;
		ratioIndex < ASPECT_RATIOS.length;
		ratioIndex++
	) {
		const potentialRatio = ASPECT_RATIOS[ratioIndex];
		if (aspectRatio >= potentialRatio.ratio) {
			const ratioDiff = aspectRatio - potentialRatio.ratio;
			if (ratioDiff > 0.1) {
				// No close aspect ratio match found.
				return;
			}
			// Close aspect ratio match found.
			return `wp-has-aspect-ratio ${potentialRatio.className}`.trim();
		}
	}
}

const removeAspectRatioClasses = (existingClassNames) => {
	if (!existingClassNames) {
		return existingClassNames;
	}
	const updatedExistingClassArray = existingClassNames.split(/\s+/)
		.filter(
			(className) => {
				if (className == 'wp-has-aspect-ratio' || className == 'wp-block-embed') {
					return false;
				}
				for (const aspectRatio of ASPECT_RATIOS) {
					if (aspectRatio.className == className) {
						return false;
					}
				}
				return true;
			}
		);
	return `${updatedExistingClassArray.join(' ')}`.trim();
}

const addAspectRatioClassName = (width, height, existingClassNames) => {
	const aspectRatioClassName = getAspectRatioClassName(width, height);
	if (!aspectRatioClassName) {
		return existingClassNames;
	}
	const updatedExistingClassNames = removeAspectRatioClasses(existingClassNames) || '';
	return `${updatedExistingClassNames} ${aspectRatioClassName}`.trim();
}

const getBilibiliEmbedURL = (bvid, page, displayMode, isAutoPlay, isAutoDanmaku) => {
	const h5Mode = 'www.bilibili.com/blackboard/html5mobileplayer.html';
	const iframeMode = 'player.bilibili.com/player.html';
	// h5中只要带autoplay参数就会自动播放
	const h5AutoPlay = displayMode == 'h5' && isAutoPlay ? '&autoplay=1' : '';
	// iframe中autoplay=0不播放=1自动播放
	const iframeAutoPlay = displayMode == 'iframe' && isAutoPlay ? '&autoplay=1' : '&autoplay=0';

	const url = `https://${displayMode == 'h5' ? h5Mode : iframeMode}?
		bvid=${bvid}&page=${page ? page : 0}&danmaku=${isAutoDanmaku ? 1 : 0}
		${displayMode == 'h5' ? h5AutoPlay : iframeAutoPlay}`.replace(/\s/g, '');

	return url;
}

const fetchBilibiliInfo = (embedParams, setIsFetching, setIsEditingURL, setPreview) => {
	if (embedParams && embedParams.bvid) {
		setIsFetching(true);
		apiFetch({ path: `api/embed/bilibili/video?bvid=${embedParams.bvid}` })
			.then(response => {
				if (response.error_code == 0 && response.data) {
					// 请求成功，更改数据类型，设置preview为视频信息对象
					setPreview(response.data.dimension);
					setIsEditingURL(false);
				}
			})
			.catch(error => {
				console.error(error)
			})
			.finally(() => {
				setIsFetching(false);
			})
	}
}

const Edit = props => {
	const {
		attributes: {
			url: attributesUrl,
			caption: caption,
			className: className,
			autoPlay: autoPlay,
			autoDanmaku: autoDanmaku
		},
		isSelected,
		onReplace,
		setAttributes,
	} = props;

	const [url, setURL] = useState(attributesUrl);
	const [preview, setPreview] = useState(false);
	const [isEditingURL, setIsEditingURL] = useState(false);
	const [isFetching, setIsFetching] = useState(false);
	const [displayMode, setDisplayMode] = useState('h5');

	const embedParams = useMemo(() => {
		return parseBilibiliURL(attributesUrl);
	}, [attributesUrl]);

	const { oEmbedPreview, oEmbedFetching } = useSelect(
		(select) => {
			const {
				getEmbedPreview,
				isRequestingEmbedPreview
			} = select('core');

			if (!attributesUrl || embedParams || preview) {
				return { oEmbedPreview: null, oEmbedFetching: false };
			}

			return {
				oEmbedPreview: getEmbedPreview(attributesUrl),
				oEmbedFetching: isRequestingEmbedPreview(attributesUrl)
			};
			// 设置preview为依赖项，配合useLayoutEffect使用
		}, [attributesUrl, preview]);

	const { fetching, cannotEmbed } = (() => {
		if (!attributesUrl) {
			return {
				fetching: false,
				cannotEmbed: false,
			};
		}

		return {
			fetching: isFetching || oEmbedFetching,
			cannotEmbed: !embedParams || (embedParams && !preview) || oEmbedPreview,
		};

	})();

	useLayoutEffect(() => {
		// 重置preview
		setPreview(false);
	}, [attributesUrl]);

	useLayoutEffect(() => {
		if (className && (className.includes('iframe') || className.includes('h5'))) {
			setDisplayMode(className && className.includes("iframe") ? 'iframe' : 'h5');
		}
	}, [className]);

	useEffect(() => {
		fetchBilibiliInfo(embedParams, setIsFetching, setIsEditingURL, setPreview);
	}, [embedParams && embedParams.bvid, attributesUrl]);

	useEffect(() => {
		if (!preview) {
			return;
		}
		const updatedClassName = addAspectRatioClassName(
			preview.width, preview.height, className);
		setAttributes({
			className: `wp-block-embed ${updatedClassName}`
		});
	}, [preview]);

	const blockProps = useBlockProps();

	if (fetching) {
		return (
			<div className="wp-block-embed is-loading" {...blockProps}>
				<Spinner />
			</div>
		);
	}

	const showEmbedPlaceholder = !attributesUrl || cannotEmbed || isEditingURL;

	if (showEmbedPlaceholder) {
		return (
			<React.Fragment>
				<EmbedControls
					icon={pencilIcon}
					isEditingURL={isEditingURL}
					onEditClick={() => { setIsEditingURL(true) }}
					isAutoPlay={autoPlay}
					isAutoDanmaku={autoDanmaku}
					onAutoPlayChange={() => { setAttributes({ autoPlay: !autoPlay }) }}
					onAutoDanmakuChange={() => { setAttributes({ autoDanmaku: !autoDanmaku }) }}
				/>
				<div {...blockProps}>
					<EmbedPlaceholder
						icon={bilibiliIcon}
						label={label}
						onSubmit={(event) => {
							if (event) {
								event.preventDefault();
							}
							if (url == attributesUrl) {
								setIsEditingURL(false);
							}
							setAttributes({ url });
						}}
						value={url}
						providerName={oEmbedPreview && oEmbedPreview.provider_name ? oEmbedPreview.provider_name : '链接'}
						cannotEmbed={cannotEmbed}
						onChange={(event) => setURL(event.target.value)}
						fallback={() => {
							const link = <a href={url}>{url}</a>;
							onReplace(
								oEmbedPreview && oEmbedPreview.provider_name
									?
									createBlock('core/embed', {
										url: attributesUrl,
										providerNameSlug: oEmbedPreview.provider_name
									})
									:
									createBlock('core/paragraph', {
										content: renderToString(link),
									})
							);
						}}
						tryAgain={() => {
							fetchBilibiliInfo(embedParams, setIsFetching, setIsEditingURL, setPreview);
						}}
					/>
				</div>
			</React.Fragment>
		);
	}

	const aspectRatioClassName = getAspectRatioClassName(preview.width, preview.height) || '';
	const figureClassName = `wp-block-embed ${aspectRatioClassName}`.trim();

	return (
		<React.Fragment>
			<EmbedControls
				icon={pencilIcon}
				isEditingURL={isEditingURL}
				onEditClick={() => { setIsEditingURL(true) }}
				isAutoPlay={autoPlay}
				isAutoDanmaku={autoDanmaku}
				onAutoPlayChange={() => { setAttributes({ autoPlay: !autoPlay }) }}
				onAutoDanmakuChange={() => { setAttributes({ autoDanmaku: !autoDanmaku }) }}
			/>
			<div {...blockProps}>
				<EmbedPreview
					width={preview.width}
					height={preview.height}
					className={figureClassName}
					embedParams={embedParams}
					displayMode={displayMode}
					isSelected={isSelected}
					isAutoPlay={autoPlay}
					isAutoDanmaku={autoDanmaku}
					caption={caption}
					onCaptionChange={(value) =>
						setAttributes({ caption: value })
					}
				/>
			</div>
		</React.Fragment>
	);
}

const Save = ({ attributes }) => {
	const { url, autoPlay, autoDanmaku, caption, className } = attributes;
	if (!url) {
		return;
	}
	const embedParams = parseBilibiliURL(url);
	if (!embedParams || !embedParams.bvid) {
		return;
	}
	const displayMode = (className && className.includes("iframe")) ? 'iframe' : 'h5';
	const embedURL = getBilibiliEmbedURL(embedParams.bvid, embedParams.page,
		displayMode, autoPlay, autoDanmaku);

	return (
		<figure {...useBlockProps.save()}>
			<div className="wp-block-embed__wrapper">
				{`\n${embedURL}\n` /* URL needs to be on its own line. */}
			</div>
			{!RichText.isEmpty(caption) && (
				<RichText.Content
					className={captionClassNames}
					tagName="figcaption"
					value={caption}
				/>
			)}
		</figure>
	);
}

const EmbedControls = ({
	icon,
	isEditingURL,
	onEditClick,
	isAutoPlay,
	isAutoDanmaku,
	onAutoPlayChange,
	onAutoDanmakuChange
}) => {
	return (
		<React.Fragment>
			<BlockControls>
				<ToolbarGroup>
					{!isEditingURL && (
						<ToolbarButton
							className="components-toolbar__control"
							label={__('编辑URL')}
							icon={icon}
							onClick={onEditClick}
						/>
					)}
				</ToolbarGroup>
			</BlockControls>
			<InspectorControls>
				<PanelBody
					title={__('播放方式')}
				>
					<ToggleControl
						__nextHasNoMarginBottom
						checked={isAutoPlay}
						label={__('自动播放')}
						onChange={onAutoPlayChange}
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						checked={isAutoDanmaku}
						label={__('弹幕播放')}
						help={__('仅在H5中有效，Iframe中取决于用户弹幕设定')}
						onChange={onAutoDanmakuChange}
					/>
				</PanelBody>
			</InspectorControls>
		</React.Fragment>
	);
};


const EmbedPlaceholder = ({
	icon,
	label,
	value,
	providerName,
	onSubmit,
	onChange,
	cannotEmbed,
	fallback,
	tryAgain,
}) => {
	return (
		<Placeholder
			icon={icon}
			label={label}
			className="wp-block-embed"
			instructions={__(
				'粘贴至您希望显示的站点内容的链接。'
			)}
		>
			<form onSubmit={onSubmit}>
				<input
					type="url"
					value={value || ''}
					className="components-placeholder__input"
					aria-label={label}
					placeholder={__('键入要在此嵌入的URL…')}
					onChange={onChange}
				/>
				<Button variant="primary" type="submit">
					{__('嵌入')}
				</Button>
			</form>
			<div className="components-placeholder__learn-more">
				<ExternalLink
					href={
						'https://wordpress.org/support/article/embeds/'
					}
				>
					{__('了解关于嵌入的更多内容')}
				</ExternalLink>
			</div>
			{cannotEmbed && (
				<div className="components-placeholder__error">
					<div className="components-placeholder__instructions">
						{__('抱歉，此内容不能被嵌入。')}
					</div>
					<Button variant="secondary" onClick={tryAgain}>
						{__('重试')}
					</Button>{' '}
					<Button variant="secondary" onClick={fallback}>
						{sprintf('%s%s', __('转换为'), providerName)}
					</Button>
				</div>
			)}
		</Placeholder>
	);
}

const EmbedPreview = ({
	width,
	height,
	className,
	embedParams,
	displayMode,
	isSelected,
	isAutoPlay,
	isAutoDanmaku,
	caption,
	onCaptionChange
}) => {

	const [interactive, setInteractive] = useState(false);

	if (!isSelected && interactive) {
		setInteractive(false);
	}

	const iframe = <iframe onFocus={() => { setInteractive(true); }}
		src={getBilibiliEmbedURL(embedParams.bvid, embedParams.page, displayMode, isAutoPlay, isAutoDanmaku)}
		width={width} height={height} border="0" frameborder="no" framespacing="0" allowfullscreen="true"
	/>;

	return (
		<figure
			className={`${className} is-type-video`}
		>
			<div className="wp-block-embed__wrapper">
				<SandBox html={renderToString(iframe)} type={`video ${className} wp-block-embed__wrapper`} />
				{!interactive && (
					<div
						className="block-library-embed__interactive-overlay"
						onMouseUp={() => { setInteractive(true); }}
					/>
				)}
			</div>
			{(!RichText.isEmpty(caption) || isSelected) && (
				<RichText
					identifier="caption"
					tagName="figcaption"
					className={captionClassNames}
					placeholder={__('添加说明文字')}
					value={caption}
					onChange={onCaptionChange}
					inlineToolbar
					__unstableOnSplitAtEnd={() =>
						insertBlocksAfter(
							createBlock(getDefaultBlockName())
						)
					}
				/>
			)}
		</figure>
	);
}

registerBlockType(blockName, {
	apiVersion: 2,
	title: __('哔哩哔哩'),
	icon: bilibiliIcon,
	category: 'argon',
	keywords: [
		'argon',
		__('哔哩哔哩')
	],
	supports: {
		align: true,
		spacing: {
			margin: true
		}
	},
	styles: [
		{
			name: 'bilibili-embed-h5',
			label: 'H5',
			isDefault: true
		}, {
			name: 'bilibili-embed-iframe',
			label: 'Iframe',
		},
	],
	edit: Edit,
	save: Save,
	attributes: {
		url: {
			type: 'string',
			default: ''
		},
		caption: {
			type: 'string',
			source: 'html',
			selector: 'figcaption',
			__experimentalRole: 'content'
		},
		autoPlay: {
			type: 'bool',
			default: false
		},
		autoDanmaku: {
			type: 'bool',
			default: false
		}
	},

	transforms: {
		// 支持直接在P标签中输入url自动转化
		from: [
			{
				type: 'raw',
				isMatch: (node) =>
					node.nodeName === 'P' &&
					urlRegex.test(node.textContent),
				transform: (node) => {
					return createBlock(blockName, {
						url: node.textContent.trim(),
					});
				},
			},
		],
		to: [
			{
				type: 'block',
				blocks: ['core/paragraph'],
				isMatch: ({ url }) => !!url,
				transform: ({ url, caption }) => {
					let value = `<a href="${url}">${url}</a>`;
					if (caption && caption.trim()) {
						value += `<br />${caption}`;
					}
					return createBlock('core/paragraph', {
						content: value
					});
				},
			},
		]
	}
});