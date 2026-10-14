import { Station } from '../types/game';

export const STATIONS_DATA: Station[] = [
  {
    id: 1,
    title: "Trạm 1: Chân Núi Tự Tin",
    subtitle: "Nhận diện khó khăn & Thấu hiểu cảm xúc bản thân",
    mountainLocation: "Chân núi Bản Lĩnh (Độ cao 250m)",
    competencyFocus: "Tự chủ & Nhận diện cảm xúc khi đối mặt thử thách",
    scenario: {
      character: "Bạn Minh",
      situationTitle: "Nhiệm vụ làm MC Lễ Chào cờ của trường",
      situationDescription: "Cô giáo chủ nhiệm Ngô Thị Hà tin tưởng phân công Minh làm người dẫn chương trình (MC) cho buổi Lễ Chào cờ đầu tuần của toàn trường. Khi nghĩ đến cảnh phải đứng trước hàng trăm thầy cô và bạn bè, Minh cảm thấy tim đập thình thịch, tay run và toát mồ hôi. Minh rất lo sợ mình sẽ quên lời hoặc nói vấp.",
      dilemma: "Nếu là Minh, em sẽ làm gì để vượt qua cảm giác lo lắng này?"
    },
    stationBadge: {
      name: "Trái Tim Can Đảm",
      icon: "ShieldAlert",
      meaning: "Biết lắng nghe, gọi tên cảm xúc và dũng cảm đón nhận thử thách mới."
    },
    options: [
      {
        id: "s1-opt-a",
        label: "A",
        text: "Em sẽ gặp cô Hà xin từ chối ngay vì sợ làm hỏng buổi lễ và bị các bạn chê cười.",
        appropriateness: "learning_opportunity",
        characterEmotion: "thoughtful",
        visualIllustration: {
          type: "stop_pause",
          title: "Băn khoăn và chần chừ",
          description: "Minh đứng ngập ngừng trước cửa lớp, cảm giác tiếc nuối vì chưa dám thử sức."
        },
        fourPillars: {
          acknowledge: "Thầy cô rất hiểu cảm giác lo lắng của em. Khi đứng trước một việc lớn chưa từng làm, ai trong chúng ta cũng có thể thấy e ngại.",
          explanation: "Tuy nhiên, nếu từ chối ngay lúc này, em sẽ bỏ lỡ cơ hội rèn luyện sự tự tin và khám phá khả năng tiềm ẩn của chính mình.",
          suggestion: "Em có thể hít thở thật sâu, chia sẻ nỗi lo này với cô giáo hoặc người thân để được hướng dẫn từng bước nhỏ thay vì bỏ cuộc.",
          encouragement: "Dũng cảm không phải là không sợ hãi, mà là dám bước tiếp dù còn đôi chút hồi hộp. Em thử suy nghĩ cách khác xem nhé!"
        },
        fullSpeech: "Thầy cô rất hiểu cảm giác lo lắng của em. Khi đứng trước một việc lớn chưa từng làm, ai trong chúng ta cũng có thể thấy e ngại. Nhưng nếu từ chối ngay, em sẽ bỏ lỡ cơ hội khám phá khả năng của mình. Em hãy hít thở thật sâu và thử cùng thầy cô tìm cách giải quyết nhé!",
        nextActionLabel: "Thử cách khác",
        resilienceInsight: "Lo lắng là cảm xúc tự nhiên của con người. Thay vì trốn tránh, hãy học cách chấp nhận và từng bước chuẩn bị."
      },
      {
        id: "s1-opt-b",
        label: "B",
        text: "Em bình tĩnh nhận diện cảm giác hồi hộp là bình thường, hít thở sâu, rồi nhờ cô Hà và bạn An hướng dẫn luyện tập trước.",
        appropriateness: "optimal",
        characterEmotion: "happy",
        visualIllustration: {
          type: "breathe_relax",
          title: "Hít thở sâu & Cầm micro tự tin",
          description: "Minh đứng ngay ngắn, nụ cười rạng rỡ cùng cô giáo và bạn bè bên cạnh cổ vũ."
        },
        fourPillars: {
          acknowledge: "Thật tuyệt vời! Em đã biết lắng nghe cảm xúc của bản thân và hiểu rằng hồi hộp là điều rất tự nhiên khi đón nhận nhiệm vụ mới.",
          explanation: "Bằng cách hít thở sâu để lấy lại bình tĩnh và chủ động tìm kiếm sự hỗ trợ từ cô Hà cùng bạn An, em sẽ có sự chuẩn bị kỹ càng nhất.",
          suggestion: "Em hãy viết sẵn kịch bản ra giấy nhỏ, tập nói to rõ ràng trước gương và nhờ bạn bè đóng vai khán giả để nhận xét giúp mình.",
          encouragement: "Sự chuẩn bị chu đáo chính là chiếc chìa khóa vàng giúp em tỏa sáng trên sân khấu. Em đã sẵn sàng tiếp tục hành trình rồi đấy!"
        },
        fullSpeech: "Tuyệt vời! Em đã biết nhận diện cảm xúc và hiểu rằng hồi hộp là điều rất tự nhiên. Khi em bình tĩnh hít thở sâu và nhờ cô giáo cùng bạn bè hỗ trợ tập luyện, em chắc chắn sẽ hoàn thành xuất sắc nhiệm vụ. Cùng tiếp tục tiến lên đỉnh núi nào!",
        nextActionLabel: "Tiếp tục hành trình",
        resilienceInsight: "Bình tĩnh hít thở sâu và chuẩn bị kỹ lưỡng là phương thuốc kỳ diệu giúp đánh tan nỗi sợ hãi."
      },
      {
        id: "s1-opt-c",
        label: "C",
        text: "Em nhận lời nhưng im lặng lo lắng một mình, đến sát ngày Chào cờ mới bắt đầu xem lại kịch bản.",
        appropriateness: "acceptable_with_growth",
        characterEmotion: "thoughtful",
        visualIllustration: {
          type: "checklist_steps",
          title: "Đồng hồ chạy gấp gáp",
          description: "Minh ôm tập kịch bản sát ngày thi, đầu óc căng thẳng vì thiếu thời gian luyện tập."
        },
        fourPillars: {
          acknowledge: "Cô khen tinh thần trách nhiệm của em khi sẵn sàng nhận nhiệm vụ mà cô giáo đã tin tưởng giao phó.",
          explanation: "Tuy nhiên, việc giấu nỗi sợ trong lòng và trì hoãn luyện tập sẽ khiến em càng căng thẳng hơn khi thời gian gấp gáp.",
          suggestion: "Em nên chia nhỏ thời gian tập luyện ngay từ hôm nay: mỗi ngày đọc kịch bản 15 phút để lời nói trở nên lưu loát và tự nhiên.",
          encouragement: "Khi em chủ động hành động sớm, sự lo lắng sẽ dần biến thành niềm tin. Em có muốn thử điều chỉnh lại phương án không?"
        },
        fullSpeech: "Cô khen tinh thần trách nhiệm của em khi sẵn sàng nhận nhiệm vụ. Nhưng nếu giữ nỗi lo một mình và để sát ngày mới chuẩn bị, em sẽ càng hồi hộp hơn đấy. Em hãy bắt đầu tập luyện từng chút một ngay hôm nay nhé!",
        nextActionLabel: "Xem gợi ý điều chỉnh",
        resilienceInsight: "Hành động sớm xua tan nỗi sợ. Đừng để sự trì hoãn làm tăng thêm gánh nặng cho bản thân."
      },
      {
        id: "s1-opt-d",
        label: "D",
        text: "Em nhờ bạn An làm thay toàn bộ nhiệm vụ MC để bản thân không phải đứng trước đám đông.",
        appropriateness: "learning_opportunity",
        characterEmotion: "empathetic",
        visualIllustration: {
          type: "friends_collaborate",
          title: "Nhường bước và e ngại",
          description: "An sẵn lòng giúp đỡ, nhưng trong ánh mắt Minh vẫn đượm chút buồn vì chưa vượt qua được chính mình."
        },
        fourPillars: {
          acknowledge: "Biết tìm đến bạn bè là một phản ứng nhanh khi em cảm thấy nhiệm vụ vượt quá khả năng hiện tại.",
          explanation: "Nhưng nếu nhường toàn bộ cho bạn, An sẽ bị bất ngờ vì gánh nặng thêm, còn em thì chưa có cơ hội vượt qua nỗi sợ đám đông.",
          suggestion: "Thay vì nhờ An làm thay, em có thể rủ An cùng dẫn chương trình đôi hoặc nhờ An đứng dưới nhắc bài và cổ vũ cho em.",
          encouragement: "Mỗi lần vượt qua sự ngần ngại là một lần bản lĩnh của em lớn lên. Em hãy thử khám phá một cách làm khác dũng cảm hơn nhé!"
        },
        fullSpeech: "Biết tìm bạn bè giúp đỡ là một suy nghĩ tự nhiên. Nhưng nếu nhờ bạn làm thay hết, em sẽ chưa thể chiến thắng nỗi sợ của bản thân. Sao em không thử rủ An cùng dẫn đôi hoặc cùng luyện tập nhỉ? Chúng mình cùng thử cách khác nhé!",
        nextActionLabel: "Thử cách khác",
        resilienceInsight: "Nhờ vả không đồng nghĩa với đùn đẩy trách nhiệm. Hãy cùng hợp tác để cùng nhau tiến bộ."
      }
    ]
  },
  {
    id: 2,
    title: "Trạm 2: Dốc Kiên Trì",
    subtitle: "Giá trị của sự kiên trì, nghỉ ngơi hợp lý & điều chỉnh phương pháp",
    mountainLocation: "Dốc Đá Tai Mèo (Độ cao 500m)",
    competencyFocus: "Kiên trì vượt khó & Quản lý thời gian, năng lượng học tập",
    scenario: {
      character: "Bạn Minh",
      situationTitle: "Thử thách với bài toán hình học hóc búa",
      situationDescription: "Minh gặp một bài toán hình học khó trong phiếu ôn tập cuối tuần môn Toán lớp 5. Minh đã nháp đi nháp lại 3 lần nhưng kết quả vẫn chưa ra. Đồng hồ đã chỉ 9 giờ 30 tối, mắt Minh bắt đầu mỏi và trong lòng cảm thấy bực bội, bất lực.",
      dilemma: "Nếu là Minh trong tình huống này, em sẽ lựa chọn cách xử lý nào?"
    },
    stationBadge: {
      name: "Ngọn Lửa Kiên Trì",
      icon: "Flame",
      meaning: "Bền bỉ, biết thư giãn đúng lúc và linh hoạt thay đổi cách giải quyết."
    },
    options: [
      {
        id: "s2-opt-a",
        label: "A",
        text: "Em sẽ bỏ cuộc vì bài toán quá khó, gấp sách vở lại đi ngủ luôn.",
        appropriateness: "learning_opportunity",
        characterEmotion: "thoughtful",
        visualIllustration: {
          type: "stop_pause",
          title: "Gấp sách vở trong bế tắc",
          description: "Minh gục đầu xuống bàn, bài toán khó vẫn còn nằm dở trên trang giấy trắng."
        },
        fourPillars: {
          acknowledge: "Minh ơi, khi gặp một bài toán khó mà làm mãi chưa ra, chúng mình hoàn toàn có thể cảm thấy mệt mỏi và nản lòng.",
          explanation: "Nhưng nếu bỏ cuộc ngay lập tức, Minh sẽ bỏ lỡ cơ hội rèn luyện tư duy và cảm giác vỡ òa sung sướng khi tìm ra lời giải.",
          suggestion: "Minh hãy tạm rời bàn học, uống một cốc nước ấm, đi dạo vài bước rồi đọc lại đề bài từ những dữ kiện đã biết xem sao.",
          encouragement: "Người chiến thắng không phải người chưa từng gặp khó, mà là người không chịu đầu hàng dễ dàng. Em thử cách khác nhé!"
        },
        fullSpeech: "Minh ơi, khi gặp bài khó, chúng mình có thể cảm thấy nản lòng. Nhưng nếu bỏ cuộc ngay, Minh sẽ bỏ lỡ cơ hội tìm ra cách giải. Minh hãy nghỉ một chút, đọc lại đề bài và thử bắt đầu từ điều mình đã biết nhé!",
        nextActionLabel: "Thử cách khác",
        resilienceInsight: "Nản lòng là cảm giác nhất thời. Khi bế tắc, hãy dừng lại nghỉ ngơi thay vì từ bỏ hoàn toàn."
      },
      {
        id: "s2-opt-b",
        label: "B",
        text: "Em sẽ bình tĩnh, nghỉ ngơi 5 phút, thử cách giải khác và hỏi cô khi cần.",
        appropriateness: "optimal",
        characterEmotion: "happy",
        visualIllustration: {
          type: "lightbulb",
          title: "Bóng đèn ý tưởng bừng sáng",
          description: "Minh uống ngụm nước, vươn vai thư giãn rồi vẽ lại sơ đồ hình học với nụ cười tự tin."
        },
        fourPillars: {
          acknowledge: "Tuyệt vời! Minh đã biết kiên trì và làm chủ cảm xúc của mình rất chín chắn.",
          explanation: "Nghỉ ngơi 5 phút giúp não bộ thư giãn, còn việc thử vẽ lại sơ đồ hoặc đổi hướng suy nghĩ sẽ mở ra cách nhìn mới cho bài toán.",
          suggestion: "Nếu sau khi thử cách mới vẫn chưa giải được, Minh hãy đánh dấu lại để sáng mai đến lớp nhờ cô Hà hoặc bạn bè hướng dẫn.",
          encouragement: "Mỗi lần kiên trì thử nghiệm là một bước tiến vượt bậc của tư duy. Ngôi sao kiên trì đã thuộc về em, cùng leo tiếp nào!"
        },
        fullSpeech: "Tuyệt vời! Minh đã biết kiên trì và chủ động tìm cách giải quyết. Khi chưa tự làm được, nhờ cô giáo hướng dẫn cũng là một cách học rất tốt. Mỗi lần cố gắng, chúng mình lại tiến bộ thêm một chút!",
        nextActionLabel: "Tiếp tục hành trình",
        resilienceInsight: "Kiên trì kết hợp nghỉ ngơi hợp lý và chủ động hỏi han là bí quyết làm chủ mọi bài toán khó."
      },
      {
        id: "s2-opt-c",
        label: "C",
        text: "Em sẽ chép bài của bạn để hoàn thành nhanh cho xong bài tập.",
        appropriateness: "learning_opportunity",
        characterEmotion: "empathetic",
        visualIllustration: {
          type: "friends_collaborate",
          title: "Cùng nhau trao đổi bài học",
          description: "Hai bạn cùng ngồi bên bàn học, chỉ tay vào từng bước chứng minh thay vì chép bài thụ động."
        },
        fourPillars: {
          acknowledge: "Cô hiểu mong muốn hoàn thành bài tập đúng giờ để không bị thầy cô nhắc nhở của em.",
          explanation: "Tuy nhiên, chép bài chỉ là giải pháp tạm thời. Em có thể nộp được bài nhưng trong đầu vẫn chưa hiểu vì sao lại giải như thế.",
          suggestion: "Thay vì chép bài của bạn, em hãy nhờ bạn giải thích từng bước: 'Vì sao cậu lại vẽ thêm đường phụ này?', sau đó tự tay làm lại.",
          encouragement: "Hiểu được một bước do chính mình làm quý giá hơn nhiều việc chép nguyên cả bài hoàn hảo. Minh muốn cùng tìm cách giải lại không?"
        },
        fullSpeech: "Cách này có thể giúp Minh hoàn thành bài trước mắt, nhưng Minh vẫn chưa hiểu cách giải. Nếu nhờ bạn giải thích từng bước rồi tự làm lại, Minh sẽ học được nhiều hơn. Minh muốn thử cách đó không?",
        nextActionLabel: "Cùng tìm cách giải",
        resilienceInsight: "Trung thực trong học tập giúp kiến thức thực sự thuộc về em. Đừng để bài giải của người khác thay thế tư duy của chính mình."
      },
      {
        id: "s2-opt-d",
        label: "D",
        text: "Em quyết tâm thức thâu đêm đến 12 giờ khuya, ép bản thân phải giải ra bằng được dù đầu óc rất mệt.",
        appropriateness: "acceptable_with_growth",
        characterEmotion: "thoughtful",
        visualIllustration: {
          type: "stop_pause",
          title: "Mắt mỏi và đồng hồ khuya",
          description: "Minh thức khuya dưới ánh đèn bàn le lói, cảm thấy buồn ngủ và uể oải."
        },
        fourPillars: {
          acknowledge: "Cô rất trân trọng ý chí quyết tâm cao độ và tinh thần không chịu lùi bước trước thử thách của em.",
          explanation: "Thế nhưng, thức quá khuya khi cơ thể đã mệt mỏi sẽ khiến não bộ bị quá tải, ngày mai lên lớp em sẽ buồn ngủ và không tiếp thu được bài mới.",
          suggestion: "Em nên quy định giờ đi ngủ đúng 10h tối để giữ gìn sức khỏe. Bài toán chưa xong, sáng mai em dậy sớm với tinh thần minh mẫn sẽ giải nhanh hơn nhiều.",
          encouragement: "Kiên trì thông minh là biết bảo vệ sức khỏe của bản thân. Em hãy suy nghĩ để lựa chọn giải pháp cân bằng hơn nhé!"
        },
        fullSpeech: "Cô rất khen ngợi quyết tâm của em. Nhưng thức thâu đêm khi đầu óc đã quá mệt sẽ làm hại sức khỏe và giảm sự tập trung ngày mai. Em hãy đi ngủ đúng giờ, sáng mai dậy sớm với tinh thần sảng khoái nhé!",
        nextActionLabel: "Xem lời khuyên sức khỏe",
        resilienceInsight: "Kiên trì bền bỉ khác với sự bướng bỉnh hại sức khỏe. Nghỉ ngơi đúng giờ để nạp lại năng lượng sáng tạo."
      }
    ]
  },
  {
    id: 3,
    title: "Trạm 3: Rừng Trợ Lực",
    subtitle: "Chủ động tìm kiếm sự giúp đỡ không phải là yếu đuối",
    mountainLocation: "Rừng Thông Tương Trợ (Độ cao 750m)",
    competencyFocus: "Giao tiếp, Hợp tác & Kỹ năng tìm kiếm sự trợ giúp đúng đắn",
    scenario: {
      character: "Bạn An",
      situationTitle: "Thử thách vẽ tranh cổ động của lớp 5A7",
      situationDescription: "An được cô giáo Ngô Thị Hà và tập thể lớp 5A7 tín nhiệm giao phụ trách vẽ bức tranh cổ động khổ lớn dự thi cấp trường về chủ đề 'An toàn giao thông'. An có ý tưởng rất phong phú nhưng lại gặp khó khăn ở khâu pha màu nước diện tích lớn và thời hạn nộp bài chỉ còn đúng 2 ngày.",
      dilemma: "Nếu là An, em sẽ ứng xử như thế nào để hoàn thành tác phẩm đúng hạn?"
    },
    stationBadge: {
      name: "Bàn Tay Gắn Kết",
      icon: "Users",
      meaning: "Biết mở lòng, tin tưởng bạn bè và lan tỏa sức mạnh tập thể."
    },
    options: [
      {
        id: "s3-opt-a",
        label: "A",
        text: "An im lặng tự làm một mình vì sợ nếu hỏi nhờ người khác sẽ bị các bạn chê là kém cỏi.",
        appropriateness: "learning_opportunity",
        characterEmotion: "thoughtful",
        visualIllustration: {
          type: "stop_pause",
          title: "Một mình gồng gánh",
          description: "An ngồi một góc với bức tranh dang dở, thời gian đếm ngược từng giờ."
        },
        fourPillars: {
          acknowledge: "Cô hiểu An có lòng tự trọng cao và mong muốn tự tay khẳng định năng lực cá nhân trước tập thể.",
          explanation: "Tuy nhiên, không ai có thể giỏi tất cả mọi thứ. Khi giấu khó khăn vì e ngại, em có thể làm muộn thời hạn nộp tranh của cả lớp.",
          suggestion: "An hãy nhớ rằng: Hỏi xin sự trợ giúp không phải là yếu đuối, mà là biểu hiện của người có trách nhiệm và biết nhìn xa.",
          encouragement: "Khi em sẵn sàng mở lời, em sẽ bất ngờ trước sự nhiệt tình của cô giáo và các bạn. Hãy thử một lựa chọn cởi mở hơn nhé!"
        },
        fullSpeech: "Cô hiểu An có lòng tự trọng cao và muốn tự khẳng định mình. Nhưng hỏi xin trợ giúp không phải là yếu đuối, mà là biểu hiện của người có trách nhiệm với tập thể. Hãy mở lòng để mọi người cùng đồng hành cùng em nhé!",
        nextActionLabel: "Thử cách khác",
        resilienceInsight: "Chủ động tìm kiếm sự giúp đỡ khi cần thiết chính là biểu hiện của sự can đảm và trưởng thành."
      },
      {
        id: "s3-opt-b",
        label: "B",
        text: "An chủ động trao đổi với cô Hà để xin tư vấn, đồng thời rủ các bạn khéo tay trong lớp cùng chia nhau vẽ và tô màu.",
        appropriateness: "optimal",
        characterEmotion: "collaborative",
        visualIllustration: {
          type: "friends_collaborate",
          title: "Cả nhóm cùng hòa sắc",
          description: "Cô giáo hướng dẫn cách pha màu, các bạn trong nhóm chia nhau từng mảng tranh rộn rã tiếng cười."
        },
        fourPillars: {
          acknowledge: "Một quyết định vô cùng sáng suốt và mang tinh thần tập thể tuyệt vời!",
          explanation: "Hỏi cô giáo giúp An nắm vững kỹ thuật phối màu, còn rủ các bạn cùng làm sẽ phát huy thế mạnh của từng thành viên, giúp bức tranh hoàn thành nhanh và đẹp hơn.",
          suggestion: "An có thể phân công rõ ràng: bạn phác nét chữ khẩu hiệu, bạn pha màu nền, bạn tô chi tiết xe cộ để công việc nhịp nhàng.",
          encouragement: "Sức mạnh của tình đoàn kết lớp 5A7 đã giúp bức tranh tỏa sáng. Em xứng đáng nhận Huy hiệu Bàn Tay Gắn Kết!"
        },
        fullSpeech: "Quyết định thật sáng suốt! Khi An chủ động xin cô giáo định hướng và rủ các bạn cùng chia sẻ công việc, bức tranh không chỉ hoàn thành đúng hạn mà còn thắm đượm tinh thần đoàn kết. Chúc mừng em đã vượt qua Trạm 3!",
        nextActionLabel: "Tiếp tục hành trình",
        resilienceInsight: "Muốn đi nhanh hãy đi một mình, muốn đi xa và làm việc lớn hãy đi cùng nhau."
      },
      {
        id: "s3-opt-c",
        label: "C",
        text: "An than vãn với mọi người rằng nhiệm vụ này quá nặng rồi xin rút lui, bỏ mặc bức tranh.",
        appropriateness: "learning_opportunity",
        characterEmotion: "empathetic",
        visualIllustration: {
          type: "stop_pause",
          title: "Bức tranh còn dang dở",
          description: "Màu vẽ để khô trên bảng màu, lớp học thiếu đi bức tranh cổ động cho ngày hội."
        },
        fourPillars: {
          acknowledge: "Áp lực thời gian 2 ngày quả thực là một thử thách căng thẳng đối với một học sinh lớp 5 như em.",
          explanation: "Thế nhưng, than vãn và bỏ dở công việc giữa chừng sẽ làm phụ lòng tin của cô giáo và ảnh hưởng đến phong trào thi đua của lớp 5A7.",
          suggestion: "Thay vì bỏ cuộc, An hãy cùng lớp trưởng ngồi lại 10 phút, liệt kê những phần còn thiếu để cùng cô tìm người hỗ trợ.",
          encouragement: "Khó khăn xuất hiện là để thử thách bản lĩnh của chúng mình. An hãy lấy lại tinh thần và thử một hướng đi tích cực nhé!"
        },
        fullSpeech: "Áp lực thời gian quả thực rất căng thẳng. Nhưng nếu than vãn rồi bỏ cuộc, em sẽ đánh mất niềm tin của bạn bè và thầy cô. Hãy bình tĩnh lại, chia sẻ thẳng thắn khó khăn để cùng cả lớp tháo gỡ nhé!",
        nextActionLabel: "Cùng tìm cách gỡ khó",
        resilienceInsight: "Than vãn không làm khó khăn biến mất, chỉ có hành động cụ thể và tinh thần trách nhiệm mới mang lại giải pháp."
      },
      {
        id: "s3-opt-d",
        label: "D",
        text: "An nhờ anh trai học cấp ba vẽ hộ toàn bộ bức tranh rồi nộp và nhận là do mình tự vẽ.",
        appropriateness: "learning_opportunity",
        characterEmotion: "thoughtful",
        visualIllustration: {
          type: "stop_pause",
          title: "Bức tranh đẹp nhưng thiếu trung thực",
          description: "Bức tranh đoạt giải nhưng trong lòng An lại cảm thấy ngượng ngùng khi được mọi người khen ngợi."
        },
        fourPillars: {
          acknowledge: "Cô hiểu An mong muốn lớp mình có một tác phẩm thật hoàn hảo để giành giải thưởng cao trong cuộc thi.",
          explanation: "Tuy nhiên, nhờ người khác làm hộ rồi nhận vơ là của mình là hành vi thiếu trung thực. Giải thưởng đó sẽ không đem lại niềm vui thực sự.",
          suggestion: "An có thể nhờ anh trai chỉ bảo kỹ thuật pha màu, nhưng từng nét vẽ trên bức tranh phải do chính bàn tay học sinh lớp 5A7 thực hiện.",
          encouragement: "Một tác phẩm dù còn nét vẽ vụng về nhưng do chính các em nỗ lực tạo nên vẫn luôn là tác phẩm đẹp nhất và đáng tự hào nhất."
        },
        fullSpeech: "Cô hiểu An muốn lớp có một bức tranh thật đẹp để đạt giải. Nhưng nhờ người khác vẽ hộ rồi nhận là của mình thì không trung thực chút nào. Một bức tranh do chính các em tự tay vẽ, dù còn vụng về, vẫn luôn đáng tự hào nhất!",
        nextActionLabel: "Thử cách khác",
        resilienceInsight: "Thành công chỉ thực sự trọn vẹn và tự hào khi được dựng xây từ lòng trung thực và sự nỗ lực chân chính."
      }
    ]
  },
  {
    id: 4,
    title: "Trạm 4: Thác Kế Hoạch",
    subtitle: "Lập kế hoạch, chia nhỏ mục tiêu & rút kinh nghiệm từng bước",
    mountainLocation: "Thác Nước Chiến Lược (Độ cao 1000m)",
    competencyFocus: "Tự chủ & Kỹ năng lập kế hoạch vượt qua khó khăn dài hạn",
    scenario: {
      character: "Bạn Minh",
      situationTitle: "Mục tiêu nâng cao kết quả học tập & rèn luyện thể lực",
      situationDescription: "Bước vào lớp 5, qua bài khảo sát đầu năm, Minh thấy môn Tiếng Anh và kỹ năng chạy bền thể dục của mình đạt kết quả chưa như mong muốn. Minh rất muốn cải thiện để cuối kỳ 1 đạt loại Tốt, nhưng cảm thấy có quá nhiều kiến thức và bài tập khiến Minh bối rối không biết bắt đầu từ đâu.",
      dilemma: "Nếu là Minh, em sẽ lập kế hoạch như thế nào để vượt qua khó khăn này?"
    },
    stationBadge: {
      name: "Bản Đồ Chiến Lược",
      icon: "MapPin",
      meaning: "Biết chia nhỏ mục tiêu lớn thành từng bước đi vững chắc mỗi ngày."
    },
    options: [
      {
        id: "s4-opt-a",
        label: "A",
        text: "Minh lập thời gian biểu chi tiết: mỗi ngày học 5 từ mới Tiếng Anh, chạy bền 15 phút và có sổ tay theo dõi tiến bộ hằng tuần.",
        appropriateness: "optimal",
        characterEmotion: "proud",
        visualIllustration: {
          type: "checklist_steps",
          title: "Bảng kế hoạch tích dấu xanh",
          description: "Minh vui vẻ tích từng dấu hoàn thành vào bảng mục tiêu nhỏ mỗi ngày, thể lực và vốn từ đều tăng rõ rệt."
        },
        fourPillars: {
          acknowledge: "Xuất sắc! Minh đã có tư duy của một nhà leo núi thực thụ: biết chia ngọn núi cao thành từng chặng leo vừa sức.",
          explanation: "Học 5 từ mới và chạy 15 phút mỗi ngày là mục tiêu rất khả thi, không gây quá tải nhưng tạo thành thói quen rèn luyện bền bỉ.",
          suggestion: "Cuối mỗi tuần, Minh hãy mở sổ tự thưởng cho mình một điểm cộng và điều chỉnh lại bài học nếu có điểm nào chưa hiểu.",
          encouragement: "Kiên trì từng bước nhỏ mỗi ngày sẽ tạo nên sự thay đổi kỳ diệu sau 3 tháng. Ngọn cờ Thác Kế Hoạch đã tung bay vì em!"
        },
        fullSpeech: "Xuất sắc! Minh đã biết chia ngọn núi cao thành từng bước đi vừa sức. Mỗi ngày học 5 từ mới và chạy 15 phút là mục tiêu rất thực tế. Thói quen kiên trì này chắc chắn sẽ giúp Minh tiến bộ vượt bậc!",
        nextActionLabel: "Tiếp tục hành trình",
        resilienceInsight: "Hành trình vạn dặm bắt đầu từ một bước chân. Chia nhỏ mục tiêu giúp biến việc khó thành việc dễ."
      },
      {
        id: "s4-opt-b",
        label: "B",
        text: "Minh đặt mục tiêu cực cao: ngày mai phải thuộc ngay 50 từ vựng và chạy 10 vòng sân trường liên tục.",
        appropriateness: "learning_opportunity",
        characterEmotion: "thoughtful",
        visualIllustration: {
          type: "stop_pause",
          title: "Kiệt sức vì quá tải",
          description: "Minh thở dốc bên đường chạy, người mỏi nhừ và cảm thấy chán nản vì mục tiêu quá xa vời."
        },
        fourPillars: {
          acknowledge: "Thầy cô rất khen ngợi khát khao tiến bộ mạnh mẽ và nhiệt huyết tràn trề của em.",
          explanation: "Tuy nhiên, đặt mục tiêu quá đột ngột vượt xa sức chịu đựng của cơ thể sẽ dẫn đến kiệt sức, chấn thương và dễ nảy sinh tâm lý chán nản.",
          suggestion: "Em nên áp dụng nguyên tắc 'tăng dần đều': bắt đầu từ 5 từ, sau một tuần tăng lên 7 từ; chạy từ 2 vòng rồi tăng dần lên 3 vòng.",
          encouragement: "Đường dài mới biết sức ngựa, bền bỉ quan trọng hơn vội vã. Em thử điều chỉnh lại kế hoạch cho vừa sức mình nhé!"
        },
        fullSpeech: "Nhiệt huyết của em thật đáng khen! Nhưng mục tiêu quá cao ngay từ ngày đầu sẽ khiến cơ thể kiệt sức và dễ nản lòng. Em hãy bắt đầu từ những bước nhỏ vừa sức rồi nâng dần độ khó lên nhé!",
        nextActionLabel: "Thử điều chỉnh kế hoạch",
        resilienceInsight: "Dục tốc bất đạt. Tiến bộ bền vững đến từ sự tích lũy đều đặn mỗi ngày chứ không phải cú nhảy vội vã."
      },
      {
        id: "s4-opt-c",
        label: "C",
        text: "Minh nghĩ rằng mình không có năng khiếu học ngoại ngữ và thể thao nên không cần cố gắng, cứ để tự nhiên.",
        appropriateness: "learning_opportunity",
        characterEmotion: "empathetic",
        visualIllustration: {
          type: "stop_pause",
          title: "Bỏ cuộc trước khi thử sức",
          description: "Minh đứng nhìn các bạn tập luyện với suy nghĩ tự ti về khả năng của bản thân."
        },
        fourPillars: {
          acknowledge: "Cảm giác tự ti là điều ai cũng từng trải qua khi thấy mình chưa làm tốt bằng bạn bè xung quanh.",
          explanation: "Nhưng năng khiếu chỉ là điểm khởi đầu nhỏ, 90% thành công là do sự khổ luyện và phương pháp rèn luyện đúng đắn.",
          suggestion: "Minh hãy thử bắt đầu nghe một bài hát Tiếng Anh yêu thích hoặc chạy chậm cùng một người bạn, em sẽ thấy môn học thú vị hơn nhiều.",
          encouragement: "Bộ não và cơ bắp của chúng ta đều có thể phát triển nhờ luyện tập. Đừng tự giới hạn bản thân trước khi em thật sự cố gắng!"
        },
        fullSpeech: "Cảm giác tự ti là điều ai cũng từng trải qua khi chưa làm tốt. Nhưng em hãy nhớ, thành công phần lớn đến từ sự kiên trì luyện tập chứ không chỉ do năng khiếu. Đừng vội bỏ cuộc khi mình chưa bắt đầu thử sức nhé!",
        nextActionLabel: "Tìm lại niềm tin",
        resilienceInsight: "Bộ não như một cơ bắp, càng rèn luyện càng trở nên thông minh và dẻo dai."
      },
      {
        id: "s4-opt-d",
        label: "D",
        text: "Minh tự nhủ còn nhiều thời gian, đợi đến sát tuần thi học kỳ 1 mới bắt đầu học ngày học đêm để bù lại.",
        appropriateness: "acceptable_with_growth",
        characterEmotion: "thoughtful",
        visualIllustration: {
          type: "checklist_steps",
          title: "Áp lực dồn ứ cuối kỳ",
          description: "Tập tài liệu chất cao như núi khi kỳ thi sát nút khiến Minh vô cùng lo âu."
        },
        fourPillars: {
          acknowledge: "Biết hướng tới kỳ thi học kỳ là em đã có ý thức về kết quả học tập của bản thân.",
          explanation: "Nhưng học dồn 'nước đến chân mới nhảy' chỉ giúp nhớ tạm thời để đối phó, còn kỹ năng thực tế và sức bền thể lực không thể có được sau vài đêm.",
          suggestion: "Em hãy biến mỗi ngày học thành một ngày tích lũy. Học đều đặn mỗi ngày 20 phút nhẹ nhàng hơn rất nhiều so với học thâu đêm trước ngày thi.",
          encouragement: "Chủ động về thời gian là phẩm chất của người học trò tự chủ. Em hãy thử chọn lại cách phân bổ thời gian hợp lý hơn nhé!"
        },
        fullSpeech: "Có ý thức về kỳ thi là rất tốt, nhưng nước đến chân mới nhảy sẽ khiến em rơi vào hoảng sợ và kết quả không vững chắc. Học đều đặn mỗi ngày một ít vừa nhẹ nhàng lại vừa nhớ lâu, em hãy thử xem!",
        nextActionLabel: "Chọn cách học đều đặn",
        resilienceInsight: "Sự chuẩn bị từ hôm nay là tấm đệm êm ái nhất cho thành công của ngày mai."
      }
    ]
  },
  {
    id: 5,
    title: "Trạm 5: Đỉnh Núi Bản Lĩnh",
    subtitle: "Vận dụng vào cuộc sống, lan tỏa tinh thần kiên trì & hỗ trợ bạn bè",
    mountainLocation: "Đỉnh Núi Bản Lĩnh (Độ cao 1350m - Đỉnh Vinh Quang)",
    competencyFocus: "Trách nhiệm, Nhân ái & Vận dụng bài học vượt khó vào thực tế",
    scenario: {
      character: "Bạn Nam & Minh",
      situationTitle: "Người bạn nản lòng trong giờ kiểm tra Thể dục",
      situationDescription: "Trong giờ kiểm tra môn Thể dục nội dung đá cầu của lớp 5A7, bạn Nam liên tiếp đá hỏng 3 lần và không đạt yêu cầu. Thấy các bạn khác đều được điểm cao, Nam vô cùng xấu hổ, bật khóc nức nở và quay lưng chạy về góc sân, nói rằng sẽ bỏ cuộc không thi lại nữa.",
      dilemma: "Chứng kiến giọt nước mắt của Nam, em sẽ làm gì để giúp bạn vượt qua khó khăn này?"
    },
    stationBadge: {
      name: "Ngọn Hải Đăng Bản Lĩnh",
      icon: "Crown",
      meaning: "Không chỉ tự mình vượt khó mà còn biết tiếp thêm sức mạnh cho người khác."
    },
    options: [
      {
        id: "s5-opt-a",
        label: "A",
        text: "Em mặc kệ Nam vì việc kiểm tra là trách nhiệm của mỗi cá nhân, mình làm tốt phần mình là đủ rồi.",
        appropriateness: "learning_opportunity",
        characterEmotion: "thoughtful",
        visualIllustration: {
          type: "stop_pause",
          title: "Sự thờ ơ xa cách",
          description: "Nam ngồi khóc một mình bên góc sân trong khi các bạn khác mải mê cười nói."
        },
        fourPillars: {
          acknowledge: "Tập trung hoàn thành tốt nhiệm vụ cá nhân là trách nhiệm căn bản của mỗi học sinh.",
          explanation: "Tuy nhiên, sống trong một tập thể lớp 5A7 yêu thương, sự thờ ơ trước nỗi buồn của bạn bè sẽ làm mất đi tinh thần đoàn kết và sẻ chia.",
          suggestion: "Một lời hỏi thăm ấm áp: 'Nam ơi đừng buồn, lúc trước tớ cũng từng đá trượt như cậu đấy' sẽ giúp bạn có thêm niềm tin rất lớn.",
          encouragement: "Đỉnh núi bản lĩnh cao nhất không chỉ tôn vinh người chiến thắng đơn độc, mà tôn vinh người biết nâng đỡ bạn bè cùng tiến lên. Em thử cách khác nhé!"
        },
        fullSpeech: "Tập trung làm tốt việc của mình là đúng, nhưng sống trong một tập thể, sự vô cảm trước nỗi buồn của bạn sẽ khiến tình bạn xa cách. Chỉ cần một lời an ủi chân thành, em có thể giúp Nam lấy lại tự tin đấy!",
        nextActionLabel: "Thử cách khác",
        resilienceInsight: "Người có bản lĩnh thực sự là người biết chìa bàn tay ấm áp nâng đỡ người khác khi họ vấp ngã."
      },
      {
        id: "s5-opt-b",
        label: "B",
        text: "Em đến bên an ủi, đưa khăn lau nước mắt cho Nam, hướng dẫn bạn cách giữ bình tĩnh và cùng Nam tâng cầu nháp vài lần trước khi xin thầy cho thi lại.",
        appropriateness: "optimal",
        characterEmotion: "proud",
        visualIllustration: {
          type: "comfort_cheer",
          title: "Bàn tay nâng đỡ & Nụ cười tự tin",
          description: "Minh và Nam cùng tâng quả cầu hoa nở rộ, thầy giáo mỉm cười gật đầu khích lệ."
        },
        fourPillars: {
          acknowledge: "Thật cảm động và đáng tự hào! Em đã thể hiện tấm lòng nhân ái và sự đồng cảm sâu sắc của người bạn gương mẫu lớp 5A7.",
          explanation: "Lời an ủi kịp thời giúp Nam nguôi ngoai nỗi sợ, còn việc cùng tâng cầu nháp sẽ giúp bạn quen lại nhịp chân và lấy lại sự tự tin để vượt qua bài kiểm tra.",
          suggestion: "Sau buổi học, em có thể rủ Nam cùng chơi đá cầu mỗi giờ ra chơi để cả hai bạn cùng nâng cao thể lực và thắt chặt tình bạn.",
          encouragement: "Hành động cao đẹp của em đã thắp sáng đỉnh núi Bản Lĩnh! Em chính là Dũng sĩ Bản lĩnh xuất sắc nhất của cô Hà và lớp 5A7!"
        },
        fullSpeech: "Thật đáng tự hào! Em đã biết đồng cảm, an ủi và tận tình giúp bạn vượt qua sự tự ti. Khi em cùng bạn luyện tập, em đã lan tỏa tinh thần kiên trì đến mọi người. Em xứng đáng là Dũng sĩ trên Đỉnh Núi Bản Lĩnh!",
        nextActionLabel: "Chạm đỉnh vinh quang",
        resilienceInsight: "Tình bạn chân chính và sự sẻ chia là nguồn sức mạnh vô tận giúp chúng ta vượt qua mọi ghềnh thác trong cuộc đời."
      },
      {
        id: "s5-opt-c",
        label: "C",
        text: "Em cùng một số bạn đứng cười đùa và trêu chọc Nam vì là con trai mà lại mít ướt khóc nhè trước lớp.",
        appropriateness: "learning_opportunity",
        characterEmotion: "empathetic",
        visualIllustration: {
          type: "stop_pause",
          title: "Vết thương từ lời trêu đùa",
          description: "Nam cúi gằm mặt đau lòng trước những tiếng cười đùa vô tâm của bạn bè."
        },
        fourPillars: {
          acknowledge: "Có thể các em chỉ nghĩ đơn giản là trêu đùa cho vui mà không cố ý làm bạn buồn.",
          explanation: "Thế nhưng, trêu chọc khi người khác đang thất bại và đau lòng là hành vi gây tổn thương tâm lý nghiêm trọng, khiến bạn càng thêm tự ti và sợ hãi môn học.",
          suggestion: "Em hãy đặt mình vào vị trí của Nam: nếu mình đá hỏng và bị trêu thì mình sẽ buồn thế nào? Hãy đến xin lỗi và nói lời động viên bạn ngay nhé.",
          encouragement: "Lời nói nhã nhặn, biết tôn trọng cảm xúc của người khác chính là nét đẹp đạo đức của học sinh lớp 5. Em hãy điều chỉnh lại hành vi nhé!"
        },
        fullSpeech: "Trêu chọc bạn khi bạn đang buồn sẽ làm tổn thương lòng tự trọng của bạn rất sâu sắc. Hãy thử đặt mình vào vị trí của Nam để cảm thông và đến nói lời động viên bạn, em nhé!",
        nextActionLabel: "Thay đổi suy nghĩ",
        resilienceInsight: "Lời nói có thể nâng đỡ một tâm hồn nhưng cũng có thể làm tổn thương sâu sắc. Hãy luôn chọn sự tử tế và thấu cảm."
      },
      {
        id: "s5-opt-d",
        label: "D",
        text: "Em chạy đến gặp thầy giáo Thể dục xin thầy lấy điểm kiểm tra đá cầu của em chia đôi hoặc cho Nam điểm của em.",
        appropriateness: "acceptable_with_growth",
        characterEmotion: "thoughtful",
        visualIllustration: {
          type: "comfort_cheer",
          title: "Tình thương cần sự công bằng",
          description: "Thầy giáo ân cần xoa đầu hai bạn, giải thích về giá trị của sự tự lập và công bằng."
        },
        fourPillars: {
          acknowledge: "Cô cảm nhận được tình cảm yêu quý bạn vô cùng chân thành và mong muốn bảo vệ bạn hết lòng của em.",
          explanation: "Tuy nhiên, trong học tập, điểm số phải phản ánh đúng sự cố gắng của từng cá nhân. Làm hộ hay nhường điểm không giúp bạn có được kỹ năng thực tế.",
          suggestion: "Cách giúp đỡ bạn đúng đắn nhất là xin thầy cho Nam nghỉ ngơi 10 phút, rồi em hướng dẫn bạn cách căn điểm rơi của quả cầu để Nam tự mình thi lại.",
          encouragement: "Giúp bạn tự đứng vững trên đôi chân của mình mới là sự giúp đỡ có giá trị lâu dài nhất. Em hãy chọn cách đồng hành này nhé!"
        },
        fullSpeech: "Tình cảm thương bạn của em rất đáng quý, nhưng nhường điểm không giúp Nam thực sự biết đá cầu. Em hãy xin thầy cho bạn thêm thời gian và hướng dẫn bạn tự làm lại bằng chính sức mình nhé!",
        nextActionLabel: "Giúp bạn đúng cách",
        resilienceInsight: "Tặng bạn con cá không bằng dạy bạn cách câu cá. Giúp bạn tự lập mới là sự hỗ trợ trọn vẹn nhất."
      }
    ]
  }
];

export const TEACHER_INFO = {
  teacherName: "Cô Ngô Thị Hà",
  className: "Lớp 5A7",
  schoolName: "Trường Tiểu học Đỗ Ngọc Du",
  lessonName: "Đạo đức lớp 5 - Bài 3: Vượt qua khó khăn",
  motto: "“Mỗi khó khăn là một nấc thang – Kiên trì vững bước chạm tới thành công”"
};
