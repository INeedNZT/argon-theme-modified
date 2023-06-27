<div id="share_container">
	<div id="share" data-initialized="true">
			<?php if (get_option('argon_show_sharebtn') != 'abroad') { ?>
			<a class="no-pjax icon-wechat" tooltip="<?php _e('分享到微信', 'argon'); ?>">
				<button class="btn btn-icon btn-success">
					<span class="btn-inner--icon"><i class="fa fa-weixin"></i></span>
				</button>
			</a>
			<a target="_blank" class="no-pjax icon-douban" tooltip="<?php _e('分享到豆瓣', 'argon'); ?>">
				<button class="btn btn-icon btn-primary" style="background: #209261;border: none;">
					<span aria-hidden="true">豆</span>
				</button>
			</a>
			<a target="_blank" class="no-pjax icon-qq" tooltip="<?php _e('分享到 QQ', 'argon'); ?>">
				<button class="btn btn-icon btn-primary" style="background: #2196f3;border: none;">
					<span class="btn-inner--icon"><i class="fa fa-qq"></i></span>
				</button>
			</a>
			<a target="_blank" class="no-pjax icon-qzone" tooltip="<?php _e('分享到 QQ 空间', 'argon'); ?>">
				<button class="btn btn-icon btn-primary" style="background: #ffc107;border: none;">
					<span class="btn-inner--icon"><i class="fa fa-star"></i></span>
				</button>
			</a>
			<a target="_blank" class="no-pjax icon-weibo" tooltip="<?php _e('分享到微博', 'argon'); ?>">
				<button class="btn btn-icon btn-warning">
					<span class="btn-inner--icon">
						<svg viewBox="0 150 1280 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M914.432 518.144q27.648 21.504 38.912 51.712t9.216 62.976-14.336 65.536-31.744 59.392q-34.816 48.128-78.848 81.92t-91.136 56.32-94.72 35.328-89.6 18.944-75.264 7.68-51.712 1.536-49.152-2.56-68.096-10.24-78.336-21.504-79.872-36.352-74.24-55.296-59.904-78.848q-16.384-29.696-22.016-63.488t-5.632-86.016q0-22.528 7.68-51.2t27.136-63.488 53.248-75.776 86.016-90.112q51.2-48.128 105.984-85.504t117.248-57.856q28.672-10.24 63.488-11.264t57.344 11.264q10.24 11.264 19.456 23.04t12.288 29.184q3.072 14.336 0.512 27.648t-5.632 26.624-5.12 25.6 2.048 22.528q17.408 2.048 33.792-1.536t31.744-9.216 31.232-11.776 33.28-9.216q27.648-5.12 54.784-4.608t49.152 7.68 36.352 22.016 17.408 38.4q2.048 14.336-2.048 26.624t-8.704 23.04-7.168 22.016 1.536 23.552q3.072 7.168 14.848 13.312t27.136 12.288 32.256 13.312 29.184 16.384zM656.384 836.608q26.624-16.384 53.76-45.056t44.032-64 18.944-75.776-20.48-81.408q-19.456-33.792-47.616-57.344t-62.976-37.376-74.24-19.968-80.384-6.144q-78.848 0-139.776 16.384t-105.472 43.008-72.192 60.416-38.912 68.608q-11.264 33.792-6.656 67.072t20.992 62.976 42.496 53.248 57.856 37.888q58.368 25.6 119.296 32.256t116.224 0.512 100.864-21.504 74.24-33.792zM522.24 513.024q20.48 8.192 38.912 18.432t32.768 27.648q10.24 12.288 17.92 30.72t10.752 39.424 1.536 42.496-9.728 38.912q-8.192 18.432-19.968 37.376t-28.672 35.328-40.448 29.184-57.344 18.944q-61.44 11.264-117.76-11.264t-88.064-74.752q-12.288-39.936-13.312-70.656t16.384-66.56q13.312-27.648 40.448-51.712t62.464-38.912 75.264-17.408 78.848 12.8zM359.424 764.928q37.888 3.072 57.856-18.432t21.504-48.128-15.36-47.616-52.736-16.896q-27.648 3.072-43.008 23.552t-17.408 43.52 9.728 42.496 39.424 21.504zM778.24 6.144q74.752 0 139.776 19.968t113.664 57.856 76.288 92.16 27.648 122.88q0 33.792-16.384 50.688t-35.328 17.408-35.328-14.336-16.384-45.568q0-40.96-22.528-77.824t-59.392-64.512-84.48-43.52-96.768-15.872q-31.744 0-47.104-15.36t-14.336-34.304 18.944-34.304 51.712-15.36zM778.24 169.984q95.232 0 144.384 48.64t49.152 146.944q0 30.72-10.24 43.52t-22.528 11.264-22.528-14.848-10.24-35.84q0-60.416-34.816-96.256t-93.184-35.84q-19.456 0-28.672-10.752t-9.216-23.04 9.728-23.04 28.16-10.752z" fill="#ffffff"></path></svg>
					</span>
				</button>
			</a>
			<a target="_blank" class="no-pjax icon-bilibili" tooltip="<?php _e('关注我的bilibili', 'argon'); ?>">
				<button class="btn btn-icon btn-primary" style="background: #00AEEC;border: none;">
					<span aria-hidden="true">
						<svg viewBox="-50 0 1120 1120" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M360.896 183.968l-90.912-88.096s-14.208-17.472 9.824-37.248c24.16-19.648 25.376-10.912 33.504-5.472s135.2 130.816 135.2 130.816h-87.616z m301.952 3.264l90.912-88.096s14.208-17.472-9.824-37.248c-24.032-19.648-25.376-10.912-33.504-5.472s-135.2 130.816-135.2 130.816h87.616zM1004 350.336c-3.264-137.984-123.168-164.192-123.168-164.192s-614.336-4.96-742.496 0C10.176 222.304 20 350.336 20 350.336s1.696 274.272-0.128 413.12c13.824 138.848 120.864 160.928 120.864 160.928s42.72 0.864 73.92 0.864c3.264 8.992 5.696 52.544 54.24 52.544 48.416 0 54.24-52.544 54.24-52.544s354.88-1.696 384.352-1.696c1.696 14.816 8.992 54.976 57.536 54.24 48.416-0.864 51.712-57.536 51.712-57.536s16.384-1.696 65.664 0C997.344 898.88 1004 764.192 1004 764.192s-1.568-275.872 0-413.856z m-98.912 439.232c0 21.728-17.248 39.456-38.464 39.456H167.2c-21.248 0-38.464-17.6-38.464-39.456V326.336c0-21.728 17.248-39.456 38.464-39.456h699.424c21.248 0 38.464 17.6 38.464 39.456v463.232zM202.4 457.152l205.344-39.456 15.52 77.184-203.648 39.456z m638.976 0l-205.344-39.456-15.648 77.184 203.776 39.456z m-418.08 191.392s45.152 81.312 95.264-26.336c48.416 105.088 101.824 27.904 101.824 27.904l30.336 19.776s-56.672 91.136-131.424 22.208c-63.232 68.928-129.728-21.952-129.728-21.952l33.728-21.6z" fill="#ffffff"></path></svg>
                    </span>
				</button>
			</a>
			<a target="_blank" class="no-pjax icon-xiaohongshu" tooltip="<?php _e('关注我的小红书', 'argon'); ?>">
				<button class="btn btn-icon btn-danger">
					<span aria-hidden="true">
                        <svg viewBox="80 0 1450 1250" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M1556.58367989 666.84618125c-29.0770875 60.29219619-60.07839434 76.86185977-124.32592969 66.70625977-41.2638082-6.52096406-63.81993076-30.68060362-69.91329112-78.89298047 24.90794648 0 49.49518974-0.64140645 73.97553165 0.21380273 16.46276308 0.64140645 23.94583682-4.91744883 23.30443036-22.23542021-0.96210967-25.01484698 0.21380185-50.24349668-0.64140644-75.25834453-0.74830781-20.95260732-12.1867207-34.63594278-33.56693174-35.06354649-42.9742248-0.96210967-85.94844961-0.32070323-133.0918163-0.32070322v212.84000508h-95.67644591V523.38496221h-96.53165507v-98.34897218h93.85912793v-83.48972607h-62.32331602v-96.10404961c20.52500273-0.96210967 40.19479717-2.03111982 63.28542569-3.10013086v-33.35312987H1291.36215693c-3.7415373 26.83216494 6.7347668 35.49115107 34.63594278 35.91875477 74.082433 1.17591152 113.10131865 42.86732432 114.49103203 117.27045968 0.42760459 20.41810224 0.10690137 40.83620362 0.10690136 63.28542656 59.8645916-2.77942763 96.74545693 21.91471699 115.98764678 72.69271875v168.68986787zM1292.00356338 336.94951924c0 29.39779073-1.17591152 51.31250771 0.74830781 72.9065206 0.53450508 5.55885527 10.79700645 14.43164238 16.56966358 14.43164239 11.65221562 0.10690137 33.03242666-3.7415373 33.46003036-7.91067744 2.45872441-22.3423207 3.42083408-46.39505888-3.20703134-67.34766622-2.24492256-7.26927188-27.47357138-7.37617324-47.57097041-12.07981933zM357.3676206 208.88205224c-0.21380185 146.34754717-0.10690137 292.8019957-0.85520829 439.14954287-0.32070323 62.64401924-39.55339072 96.10405049-98.6696754 86.26915284-38.69818242-6.41406357-59.65078974-32.60482208-61.14740449-78.7860791h64.24753448V208.98895362c32.17721836-0.10690137 64.35443672-0.10690137 96.4247537-0.10690138zM767.11937276 208.88205224c-23.62513359 47.14336582-50.02969482 93.11082099-66.81316026 137.90236378 39.33958886-2.24492256 74.61693808-4.27604238 116.73595372-6.7347668-22.23542021 44.89844414-42.01211513 84.6656376-61.78881094 124.53973154-2.67252627 5.34505254-5.23815205 10.90390781-7.91067833 16.24896124-20.73880547 41.58451143-20.63190411 41.69141191 25.33555107 42.9742248 4.81054747 0.10690137 9.51419443 0.74830781 18.28008018 1.49661474-12.93502763 25.33555019-24.26654003 48.42617871-36.45325986 71.08920264-2.03111982 3.7415373-7.48307373 8.01757969-11.3315124 8.01757968-33.99453633-0.10690137-68.30977588 1.06901016-102.09050948-2.67252626-24.4803419-2.77942763-33.78073448-21.27331055-24.26654003-44.57774092 11.65221562-28.75638428 25.44245156-56.65756026 38.2705787-84.87943946 4.38294375-9.72799629 8.76588662-19.45599258 15.28685069-33.88763495-18.9214875 0-32.60482208 0.42760459-46.28815752-0.10690138-40.62240176-1.38971338-54.09193448-19.45599258-37.41536953-56.33685703 26.40456123-58.36797685 55.90925244-115.4531417 84.02423027-173.07281162h96.42475372zM62.10690137 576.40788653c6.09336036-33.78073448 13.79023594-67.4545667 17.85247646-101.44910304 5.13125068-42.76042295 7.16237051-85.84154912 10.69010508-130.73999237h101.44910391c-17.21107002 115.98764678 3.42083408 238.81696172-72.58581827 345.50421679-20.31120088-35.70495293-38.91198516-68.52357773-57.51276855-101.34220254 0.10690137-3.84843779 0.10690137-7.91067832 0.10690137-11.97291885zM1556.58367989 305.30680596c-21.70091426 37.73607276-56.01615381 38.69818242-92.79011778 32.92552529-11.01080918-47.89167363-3.10013086-79.32058418 22.44922207-90.97279893 23.83893545-10.90390781 45.64675107-2.24492256 70.34089571 28.00807647v30.03919717z" fill="#ffffff" p-id="2981"></path><path d="M998.6670626 639.47951035c26.40456123 0 51.20560635 0.53450508 76.00665146-0.21380186 15.60755391-0.42760459 20.41810224 5.98645898 21.38021192 21.27331055 4.81054747 76.11355283 5.23815205 76.11355283-71.73060996 76.11355284H752.36702715c16.8903668-33.35312989 30.57370224-62.64401924 46.7157621-90.43829473 2.99322949-5.23815205 16.03515849-6.20026172 24.4803419-6.41406358 23.94583682-0.8552083 47.998575-0.32070323 74.29623487-0.32070321V341.33246211h-61.46810772v-94.60743575h223.10250556v93.11082101h-60.93360263c0.10690137 100.59389472 0.10690137 198.19455996 0.10690137 299.64366298zM425.89119834 343.36358281h95.03504033c4.5967456 58.68868008 2.56562578 117.80496474 15.28685068 173.6073167 14.96614834 65.3165455-8.87278799 115.88074629-39.76719345 167.40705499-46.18125703-40.4085999-71.30300537-161.42059599-70.55469756-341.01437169zM597.03979062 638.30359883h153.93752227c-17.21107002 33.6738331-30.7875041 61.1474045-45.64675107 87.97957031-2.77942763 4.91744883-10.90390781 9.62109492-16.67656495 9.72799629-44.89844414 0.74830781-89.79688828 0.42760459-141.32319785 0.42760371 19.56289307-38.80508378 35.59805244-70.3408957 49.70899161-98.13517031z" fill="#ffffff"></path></svg>
                    </span>
				</button>
			</a>
			<a target="_blank" class="no-pjax icon-tiktok" tooltip="<?php _e('关注我的抖音', 'argon'); ?>">
				<button class="btn btn-icon btn-dark">
					<span aria-hidden="true">
						<svg viewBox="-150 -50 1400 1300" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M937.4 423.9c-84 0-165.7-27.3-232.9-77.8v352.3c0 179.9-138.6 325.6-309.6 325.6S85.3 878.3 85.3 698.4c0-179.9 138.6-325.6 309.6-325.6 17.1 0 33.7 1.5 49.9 4.3v186.6c-15.5-6.1-32-9.2-48.6-9.2-76.3 0-138.2 65-138.2 145.3 0 80.2 61.9 145.3 138.2 145.3 76.2 0 138.1-65.1 138.1-145.3V0H707c0 134.5 103.7 243.5 231.6 243.5v180.3l-1.2 0.1" fill="#ffffff"></path></svg>
                    </span>
				</button>
			</a>
		<?php } if (get_option('argon_show_sharebtn') != 'domestic') { ?>
		<a target="_blank" class="no-pjax icon-facebook" tooltip="<?php _e('分享到 Facebook', 'argon'); ?>">
			<button class="btn btn-icon btn-primary" style="background: #283593;border: none;">
				<span class="btn-inner--icon"><i class="fa fa-facebook"></i></span>
			</button>
		</a>
		<a target="_blank" class="no-pjax icon-twitter" tooltip="<?php _e('分享到 Twitter', 'argon'); ?>">
			<button class="btn btn-icon btn-primary" style="background: #03a9f4;border: none;">
				<span class="btn-inner--icon"><i class="fa fa-twitter"></i></span>
			</button>
		</a>
		<a target="_blank" class="no-pjax icon-telegram" href="https://telegram.me/share/url?url=<?php echo urlencode(
$_SERVER['HTTP_HOST']);?>&text=<?php echo urlencode(html_entity_decode(get_the_title()));?>" tooltip="<?php _e('分享到 Telegram', 'argon'); ?>">
			<button class="btn btn-icon btn-primary" style="background: #42a5f5;border: none;">
				<span class="btn-inner--icon"><i class="fa fa-telegram"></i></span>
			</button>
		</a>
		<?php } ?>
		<a target="_blank" class="no-pjax icon-copy-link" id="share_copy_link" tooltip="<?php _e('复制链接', 'argon'); ?>">
			<button class="btn btn-icon btn-default">
				<span class="btn-inner--icon"><i class="fa fa-link"></i></span>
			</button>
		</a>
	</div>
	<button id="share_show" class="btn btn-icon btn-primary" tooltip="<?php _e('分享', 'argon'); ?>">
		<span class="btn-inner--icon"><i class="fa fa-share"></i></span>
	</button>
</div>
<script type="text/javascript">
	socialShare("#share", {
	    title : '<?php echo addslashes(html_entity_decode(get_the_title())); ?>',
	    description : '<?php echo addslashes(html_entity_decode(wp_trim_words(html_entity_decode(get_the_content()), 50)));?>',
	    wechatQrcodeTitle : "<?php _e('分享到微信', 'argon');?>",
	    wechatQrcodeHelper : '<?php _e('微信扫描二维码', 'argon');?>',
	    source : '<?php global $post; echo get_permalink($post -> ID); ?>'
	});
	$("#share_show")[0].onclick = function(){
		$("#share_container").addClass("opened");
	};
	$("#share_copy_link")[0].onclick = function(){
		let input = document.createElement('input');
		document.body.appendChild(input);
		input.setAttribute("value", window.location.href);
		input.setAttribute("readonly", "readonly");
		input.setAttribute("style", "opacity: 0;mouse-events:none;");
		input.select();
		if (document.execCommand('copy')){
			iziToast.show({
				title: '<?php _e('链接已复制', 'argon');?>',
				message: "<?php _e('链接已复制到剪贴板', 'argon');?>",
				class: 'shadow',
				position: 'topRight',
				backgroundColor: '#2dce89',
				titleColor: '#ffffff',
				messageColor: '#ffffff',
				iconColor: '#ffffff',
				progressBarColor: '#ffffff',
				icon: 'fa fa-check',
				timeout: 5000
			});
		}else{
			iziToast.show({
				title: '<?php _e('复制失败', 'argon');?>',
				message: "<?php _e('请手动复制链接', 'argon');?>",
				class: 'shadow',
				position: 'topRight',
				backgroundColor: '#f5365c',
				titleColor: '#ffffff',
				messageColor: '#ffffff',
				iconColor: '#ffffff',
				progressBarColor: '#ffffff',
				icon: 'fa fa-close',
				timeout: 5000
			});
		}
		document.body.removeChild(input);
	};
</script>